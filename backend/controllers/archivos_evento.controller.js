
const multer = require('multer');
const db = require('../models');
const { buildDataUrl } = require('../utils/data-url');

// Directorio donde se guardarán las imágenes
const Archivos_evento = db.Archivos_evento;


const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});


exports.subirArchivo = upload.single('archivo');
function formatArchivoEvento(instance) {
  const plain = instance.toJSON();
  const binary = instance.contenido ?? plain.contenido;
  plain.url = buildDataUrl(plain.mime_type ?? instance.mime_type, binary);
  delete plain.contenido;
  return plain;
}


exports.crearArchivoEvento = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Debes subir un archivo' });
    }

    // Obtener archivos activos ordenados por fecha (más antiguos primero)
    const activos = await Archivos_evento.findAll({
      where: { activo: true },
      order: [['createdAt', 'ASC']],
    });

    // Si ya hay 14 archivos, eliminar el más antiguo
    if (activos.length >= 14) {
   await activos[0].destroy();
    }

    const nuevoArchivo = await Archivos_evento.create({
      detalle: req.body.detalle || '',
      ruta_archivos: `${Date.now()}-${req.file.originalname}`,
      mime_type: req.file.mimetype,
      contenido: req.file.buffer,
      activo: true,
    });

    res.status(201).json({ success: true, data: formatArchivoEvento(nuevoArchivo) });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
exports.listarArchivosEvento = async (_req, res) => {
  try {
    const archivos = await Archivos_evento.findAll({
      where: { activo: true },
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json({ success: true, data: archivos.map(formatArchivoEvento) });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Reemplazar archivo de evento
exports.reemplazarArchivoEvento = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Debes subir un archivo' });
    }

    const archivo = await Archivos_evento.findByPk(id);
    if (!archivo) {
      return res.status(404).json({ success: false, message: 'Archivo no encontrado' });
    }

archivo.ruta_archivos = `${Date.now()}-${req.file.originalname}`;
    archivo.detalle = req.body.detalle || archivo.detalle;
        archivo.mime_type = req.file.mimetype;
    archivo.contenido = req.file.buffer;
    await archivo.save();

    res.status(200).json({ success: true, data: formatArchivoEvento(archivo) });
  } catch (error) {

    res.status(500).json({ success: false, error: error.message });
  }
};

// Eliminar archivo de evento
exports.eliminarArchivoEvento = async (req, res) => {
  try {
    const { id } = req.params;
    const archivo = await Archivos_evento.findByPk(id);

    if (!archivo) {
      return res.status(404).json({ success: false, message: 'Archivo no encontrado' });
    }



    await archivo.destroy();
    res.status(200).json({ success: true, message: 'Archivo eliminado' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};