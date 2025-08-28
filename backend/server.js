#!/usr/bin/env node
'use strict';

/**
 * API OCR de imágenes (JPEG/JPG/PNG) con posiciones de palabras.
 * - POST /ocr         -> una imagen
 * - POST /ocr/batch   -> varias imágenes
 * - GET  /health      -> estado
 *
 * Parámetros (form-data o query):
 *  - lang   : 'spa', 'eng', 'spa+eng'...  (def: 'spa')
 *  - psm    : Page Segmentation Mode Tesseract (def: 3 → auto layout)
 *  - oem    : OCR Engine Mode (def: 1 → LSTM neural)
 *  - enhance: 'true'|'false'  (def: true) aplica grayscale+normalize+threshold
 *  - thresh : 0..255 (def: 170) umbral de binarización cuando enhance=true
 *
 * Respuesta /ocr: {
 *   meta: { mime, original:{w,h}, processed:{w,h}, scale:{x,y} },
 *   text: "texto completo",
 *   words: [{ text, conf, bbox, bboxOriginal }],
 *   lines: [{ text, conf, bbox, bboxOriginal }]
 * }
 */

const express = require('express');
const multer  = require('multer');
const sharp   = require('sharp');
const { createWorker } = require('tesseract.js');

const app = express();
const upload = multer({
  limits: { fileSize: 25 * 1024 * 1024 },
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (!/jpeg|jpg|png/i.test(file.mimetype)) {
      return cb(new Error('Solo se permiten imágenes JPEG/JPG/PNG'));
    }
    cb(null, true);
  }
});

// ---- utils ----
const pick = (obj, keys) => keys.reduce((o, k) => (o[k] = obj[k], o), {});
const mapBBox = (bbox, sx = 1, sy = 1) => ({
  x0: Math.round(bbox.x0 * sx),
  y0: Math.round(bbox.y0 * sy),
  x1: Math.round(bbox.x1 * sx),
  y1: Math.round(bbox.y1 * sy),
});

// Mutex simple
let lastJob = Promise.resolve();
const runExclusive = fn => (lastJob = lastJob.then(fn, fn));

// Worker único (lazy)
let workerPromise = null;
function getWorker(lang = 'spa') {
  if (!workerPromise) {
    workerPromise = createWorker(lang);
  }
  return workerPromise;
}

// Preprocesado con Sharp
async function preprocess(buf, { enhance = true, threshold = 170 } = {}) {
  const base = sharp(buf, { failOnError: false });
  const meta = await base.metadata();

  let pipe = base.rotate(); // respeta EXIF
  if (enhance) {
    pipe = pipe.grayscale().normalize().threshold(threshold);
  }

  // ⚠️ Guardar preprocesado para debug (opcional)
  // await pipe.toFile("debug-preprocesado.png");

  const out = await pipe.toBuffer({ resolveWithObject: true });
  return {
    original: { w: meta.width || 0, h: meta.height || 0 },
    processed: { w: out.info.width, h: out.info.height },
    buffer: out.data,
  };
}

// OCR
async function doOCR(buf, opts) {
  const { lang = 'spa', psm = 3, oem = 1, enhance = true, thresh = 170, mime = 'image/jpeg' } = opts;

  const pre = await preprocess(buf, { enhance, threshold: Number(thresh) || 170 });
  const scale = {
    x: pre.original.w && pre.processed.w ? pre.original.w / pre.processed.w : 1,
    y: pre.original.h && pre.processed.h ? pre.original.h / pre.processed.h : 1,
  };

  const result = await runExclusive(async () => {
    const worker = await getWorker(lang);
    const { data } = await worker.recognize(pre.buffer, lang, {
      tessedit_pageseg_mode: String(Number(psm) || 3), // auto layout
      tessedit_ocr_engine_mode: String(Number(oem) || 1), // LSTM neural
      preserve_interword_spaces: '1',
    });
    return data;
  });

  const fullText = (result.text || '').replace(/\r/g, '').trim();

  const words = (result.words || []).map(w => ({
    text: w.text,
    conf: w.confidence,
    bbox: pick(w.bbox, ['x0','y0','x1','y1']),
    bboxOriginal: mapBBox(w.bbox, scale.x, scale.y),
  }));

  const lines = (result.lines || []).map(l => ({
    text: (l.text || '').trim(),
    conf: l.confidence,
    bbox: pick(l.bbox, ['x0','y0','x1','y1']),
    bboxOriginal: mapBBox(l.bbox, scale.x, scale.y),
  }));

  return {
    meta: { mime, original: pre.original, processed: pre.processed, scale },
    text: fullText,
    words,
    lines,
  };
}

// ---- Rutas ----
app.get('/health', (req, res) => res.json({ ok: true }));

app.post('/ocr', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) throw new Error('Falta el archivo (campo "file")');
    const { lang = 'spa', psm = '3', oem = '1', enhance = 'true', thresh = '170' } = req.body;

    const result = await doOCR(req.file.buffer, {
      lang,
      psm: Number(psm) || 3,
      oem: Number(oem) || 1,
      enhance: String(enhance).toLowerCase() !== 'false',
      thresh: Number(thresh) || 170,
      mime: req.file.mimetype,
    });

    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/ocr/batch', upload.array('files', 12), async (req, res) => {
  try {
    if (!req.files?.length) throw new Error('Faltan archivos (campo "files")');

    const { lang = 'spa', psm = '3', oem = '1', enhance = 'true', thresh = '170' } = req.body;

    const results = [];
    for (const f of req.files) {
      const r = await doOCR(f.buffer, {
        lang,
        psm: Number(psm) || 3,
        oem: Number(oem) || 1,
        enhance: String(enhance).toLowerCase() !== 'false',
        thresh: Number(thresh) || 170,
        mime: f.mimetype,
      });
      results.push({ file: f.originalname, ...r });
    }
    res.json({ count: results.length, results });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ---- Arranque ----
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`OCR API escuchando en http://localhost:${PORT}`));
