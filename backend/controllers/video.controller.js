const db = require('../models');
const Video = db.Video;
const { Op } = db.Sequelize;

// Crear un video
exports.crearVideo = async (req, res) => {
  try {
    const { enlace } = req.body;
    if (!enlace) {
      return res.status(400).json({ success: false, message: 'El enlace es requerido' });
    }

    const nuevoVideo = await Video.create({ enlace });
    res.status(201).json({ success: true, data: nuevoVideo });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
// Reemplazar el listado completo de videos
exports.guardarVideosMasivo = async (req, res) => {
  const { enlaces } = req.body;

  if (!Array.isArray(enlaces)) {
    return res.status(400).json({ success: false, message: 'Debe enviar un arreglo de enlaces' });
  }

  const cleanedLinks = enlaces
    .filter((enlace) => typeof enlace === 'string')
    .map((enlace) => enlace.trim())
    .filter((enlace) => enlace.length > 0);

  const transaction = await db.sequelize.transaction();

  try {
    await Video.destroy({ where: {}, transaction });

    for (const enlace of cleanedLinks) {
      await Video.create({ enlace }, { transaction });
    }

    await transaction.commit();

    const videos = await Video.findAll({
      order: [['createdAt', 'ASC']]
    });

    return res.status(200).json({ success: true, data: videos });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({ success: false, error: error.message });
  }
};


// Listar todos los videos
exports.listarVideos = async (_req, res) => {
  try {
    const videos = await Video.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json({ success: true, data: videos });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Obtener video por ID
exports.obtenerVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findByPk(id);
    if (video) {
      return res.status(200).json({ success: true, data: video });
    }
    return res.status(404).json({ success: false, message: 'Video no encontrado' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Actualizar un video
exports.actualizarVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findByPk(id);
    if (!video) {
      return res.status(404).json({ success: false, message: 'Video no encontrado' });
    }

    video.enlace = req.body.enlace || video.enlace;
    if (req.body.activo !== undefined) {
      video.activo = req.body.activo;
    }

    await video.save();
    return res.status(200).json({ success: true, data: video });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Inactivar un video
exports.inactivarVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Video.update(
      { activo: false },
      { where: { id } }
    );
    if (updated) {
      return res.status(200).json({ success: true, message: 'Video inactivado' });
    }
    return res.status(404).json({ success: false, message: 'Video no encontrado' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Eliminar un video
exports.eliminarVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Video.destroy({ where: { id } });
    if (deleted) {
      return res.status(200).json({ success: true, message: 'Video eliminado' });
    }
    return res.status(404).json({ success: false, message: 'Video no encontrado' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Buscar videos por parte del enlace
exports.buscarVideos = async (req, res) => {
  try {
    const { q } = req.query;
    const videos = await Video.findAll({
      where: {
        enlace: { [Op.like]: `%${q}%` }
      },
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json({ success: true, data: videos });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
