const multer = require('multer');
const db = require('../models');
const { buildDataUrl } = require('../utils/data-url');

const Grupos = db.Grupos;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

exports.subirArchivo = upload.single('archivo');

function formatGrupo(instance) {
  const plain = instance.toJSON();
  const binary = instance.imagen_contenido ?? plain.imagen_contenido;
  plain.imagenUrl = buildDataUrl(plain.imagen_mime ?? instance.imagen_mime, binary);
  delete plain.imagen_contenido;
  return plain;
}

exports.crearGrupo = async (req, res) => {
  try {
    const { titulo, descripcion } = req.body;

    const nuevoGrupo = await Grupos.create({
      titulo,
      descripcion,
      ruta_archivo: req.file ? `${Date.now()}-${req.file.originalname}` : null,
      imagen_mime: req.file ? req.file.mimetype : null,
      imagen_contenido: req.file ? req.file.buffer : null,
    });

    res.status(201).json({ success: true, data: formatGrupo(nuevoGrupo) });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.listarGrupos = async (_req, res) => {
  try {
    const grupos = await Grupos.findAll();
    res.status(200).json({ success: true, data: grupos.map(formatGrupo) });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.obtenerGrupo = async (req, res) => {
  try {
    const { id } = req.params;
    const grupo = await Grupos.findByPk(id);
    if (grupo) {
      return res.status(200).json({ success: true, data: formatGrupo(grupo) });
    }
    return res.status(404).json({ success: false, message: 'Grupo no encontrado' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.actualizarGrupo = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion } = req.body;

    const grupo = await Grupos.findByPk(id);
    if (!grupo) {
      return res.status(404).json({ success: false, message: 'Grupo no encontrado' });
    }

    grupo.titulo = titulo;
    grupo.descripcion = descripcion;
    if (req.file) {
      grupo.ruta_archivo = `${Date.now()}-${req.file.originalname}`;
      grupo.imagen_mime = req.file.mimetype;
      grupo.imagen_contenido = req.file.buffer;
    }
    await grupo.save();

    res.status(200).json({ success: true, data: formatGrupo(grupo) });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.inactivarGrupo = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Grupos.update(
      { activo: false },
      { where: { id } }
    );
    if (updated) {
      return res.status(200).json({ success: true, message: 'Grupo inactivado' });
    }
    return res.status(404).json({ success: false, message: 'Grupo no encontrado' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.eliminarGrupo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Grupos.destroy({ where: { id } });
    if (deleted) {
      return res.status(200).json({ success: true, message: 'Grupo eliminado' });
    }
    return res.status(404).json({ success: false, message: 'Grupo no encontrado' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};