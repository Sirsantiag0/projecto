const db = require('../models');
const Suscripcion_grupo = db.Suscripcion_grupo;

exports.crearSuscripcionGrupo = async (req, res) => {
    try {
        const nuevaSuscripcion = await Suscripcion_grupo.create(req.body);
        res.status(201).json({ success: true, data: nuevaSuscripcion });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.listarSuscripcionesGrupo = async (req, res) => {
    try {
        const suscripciones = await Suscripcion_grupo.findAll();
        res.status(200).json({ success: true, data: suscripciones });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.actualizarSuscripcionGrupo = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Suscripcion_grupo.update(req.body, { where: { id } });
        if (updated) {
            const suscripcionActualizada = await Suscripcion_grupo.findByPk(id);
            return res.status(200).json({ success: true, data: suscripcionActualizada });
        }
        return res.status(404).json({ success: false, message: 'Suscripción a grupo no encontrada' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.eliminarSuscripcionGrupo = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Suscripcion_grupo.destroy({ where: { id } });
        if (deleted) {
            return res.status(200).json({ success: true, message: 'Suscripción a grupo eliminada' });
        }
        return res.status(404).json({ success: false, message: 'Suscripción a grupo no encontrada' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Métodos adicionales específicos para Suscripcion_grupo
exports.obtenerSuscripcionesPorGrupo = async (req, res) => {
    try {
        const { grupoId } = req.params;
        const suscripciones = await Suscripcion_grupo.findAll({ 
            where: { grupo_id: grupoId }
        });
        res.status(200).json({ success: true, data: suscripciones });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.obtenerSuscripcionesPorFeligres = async (req, res) => {
    try {
        const { feligresId } = req.params;
        const suscripciones = await Suscripcion_grupo.findAll({ 
            where: { feligres_id: feligresId }
        });
        res.status(200).json({ success: true, data: suscripciones });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};