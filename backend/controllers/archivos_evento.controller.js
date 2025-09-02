const db = require('../models');
const Archivos_evento = db.Archivos_evento;
const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Directorio donde se guardarán las imágenes
const uploadDir = path.join(__dirname, '..', 'uploads');


// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const nombreUnico = Date.now() + '-' + file.originalname;
    cb(null, nombreUnico);
  }
});

// Middleware de subida
const upload = multer({ storage });

exports.subirArchivo = upload.single('archivo');

// Crear registro de archivo de evento
exports.crearArchivoEvento = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Debes subir un archivo' });
    }

    // Obtener archivos activos ordenados por fecha (más antiguos primero)
    const activos = await Archivos_evento.findAll({
      where: { activo: true },
      order: [['createdAt', 'ASC']]
    });

    // Si ya hay 4 archivos, eliminar el más antiguo
    if (activos.length >= 4) {
      const antiguo = activos[0];
      const rutaAntigua = path.join(uploadDir, antiguo.ruta_archivos);
      if (fs.existsSync(rutaAntigua)) {
        fs.unlinkSync(rutaAntigua);
      }
      await antiguo.destroy();
    }

    const nuevoArchivo = await Archivos_evento.create({
      detalle: req.body.detalle || '',
      ruta_archivos: req.file.filename,
      activo: true
    });

    res.status(201).json({ success: true, data: nuevoArchivo });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ success: false, error: error.message });
  }
};
// Listar archivos activos
exports.listarArchivosEvento = async (req, res) => {
  try {
    const archivos = await Archivos_evento.findAll({
      where: { activo: true },
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json({ success: true, data: archivos });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};



