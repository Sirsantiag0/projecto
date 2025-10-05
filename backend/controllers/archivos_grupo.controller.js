const multer = require('multer');
const db = require('../models');
const { buildDataUrl } = require('../utils/data-url');

const Archivos_grupo = db.Archivos_grupo;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

exports.subirArchivo = upload.single('archivo');

function formatArchivoGrupo(instance) {
  const plain = instance.toJSON();
  const binary = instance.contenido ?? plain.contenido;
  plain.url = buildDataUrl(plain.mime_type ?? instance.mime_type, binary);
  delete plain.contenido;
  return plain;
}

exports.crearArchivoGrupo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Debes subir un archivo',
      });
    }

    const nuevoArchivo = await Archivos_grupo.create({
      ruta_archivos: `${Date.now()}-${req.file.originalname}`,
      mime_type: req.file.mimetype,
      contenido: req.file.buffer,
      id_grupo: req.body.id_grupo,
    });

    res.status(201).json({ success: true, data: formatArchivoGrupo(nuevoArchivo) });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.descargarArchivo = async (req, res) => {
  try {
    const { id } = req.params;
    const archivo = await Archivos_grupo.findByPk(id);

    if (!archivo) {
      return res.status(404).json({ success: false, message: 'Archivo no encontrado' });
    }

    const buffer = archivo.contenido;
    if (!buffer) {
      return res.status(404).json({ success: false, message: 'El archivo no tiene contenido almacenado' });
    }

    res.setHeader('Content-Type', archivo.mime_type || 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(archivo.ruta_archivos || 'archivo')}"`);
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.listarArchivosGrupo = async (_req, res) => {
  try {
    const archivos = await Archivos_grupo.findAll();
    res.status(200).json({ success: true, data: archivos.map(formatArchivoGrupo) });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.obtenerArchivoGrupo = async (req, res) => {
  try {
    const { id } = req.params;
    const archivo = await Archivos_grupo.findByPk(id);
    if (archivo) {
      return res.status(200).json({ success: true, data: formatArchivoGrupo(archivo) });
    }
    return res.status(404).json({ success: false, message: 'Archivo de grupo no encontrado' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.actualizarArchivoGrupo = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Archivos_grupo.update(req.body, { where: { id } });
    if (updated) {
      const archivoActualizado = await Archivos_grupo.findByPk(id);
      return res.status(200).json({ success: true, data: formatArchivoGrupo(archivoActualizado) });
    }
    return res.status(404).json({ success: false, message: 'Archivo de grupo no encontrado' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.inactivarArchivoGrupo = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Archivos_grupo.update(
      { activo: false },
      { where: { id } }
    );
    if (updated) {
      return res.status(200).json({ success: true, message: 'Archivo de grupo inactivado' });
    }
    return res.status(404).json({ success: false, message: 'Archivo de grupo no encontrado' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.eliminarArchivoGrupo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Archivos_grupo.destroy({ where: { id } });
    if (deleted) {
      return res.status(200).json({ success: true, message: 'Archivo de grupo eliminado' });
    }
    return res.status(404).json({ success: false, message: 'Archivo de grupo no encontrado' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.obtenerArchivosPorGrupo = async (req, res) => {
  try {
    const { grupoId } = req.params;
    const archivos = await Archivos_grupo.findAll({
      where: { id_grupo: grupoId },
    });
    res.status(200).json({ success: true, data: archivos.map(formatArchivoGrupo) });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};