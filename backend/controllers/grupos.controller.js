const db = require('../models');
const Grupos = db.Grupos;

const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Carpeta donde se almacenarán las imágenes de los grupos
const gruposUploadDir = path.join(__dirname, '..', 'uploads', 'grupos');
// Asegurarse de que el directorio exista antes de procesar cualquier carga
if (!fs.existsSync(gruposUploadDir)) {
    fs.mkdirSync(gruposUploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, gruposUploadDir);
    },
    filename: (_req, file, cb) => {
        const nombreUnico = Date.now() + '-' + file.originalname;
        cb(null, nombreUnico);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }
});

exports.subirArchivo = upload.single('archivo');

// Crear grupo
exports.crearGrupo = async (req, res) => {
  try {
    const { titulo, descripcion } = req.body;

    const nuevoGrupo = await Grupos.create({
      titulo,
      descripcion,
      ruta_archivo: req.file ? req.file.filename : null
    });

    res.status(201).json({ success: true, data: nuevoGrupo });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ success: false, error: error.message });
  }
};

// Listar grupos
exports.listarGrupos = async (req, res) => {
  try {
    const grupos = await Grupos.findAll();
    res.status(200).json({ success: true, data: grupos });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Obtener un grupo específico
exports.obtenerGrupo = async (req, res) => {
  try {
    const { id } = req.params;
    const grupo = await Grupos.findByPk(id);
    if (grupo) {
      return res.status(200).json({ success: true, data: grupo });
    }
    return res.status(404).json({ success: false, message: 'Grupo no encontrado' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Actualizar grupo
exports.actualizarGrupo = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion } = req.body;

    const grupo = await Grupos.findByPk(id);
    if (!grupo) {
      return res.status(404).json({ success: false, message: 'Grupo no encontrado' });
    }

    // Actualizar datos básicos del grupo
    await grupo.update({
      titulo,
      descripcion,
      ruta_archivo: req.file ? req.file.filename : grupo.ruta_archivo
    });

    const grupoActualizado = await Grupos.findByPk(id);
    return res.status(200).json({ success: true, data: grupoActualizado });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ success: false, error: error.message });
  }
};

// Inactivar grupo
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

// Eliminar grupo
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
