const db = require('../models');
const Suscripcion_curso = db.Suscripcion_curso;

exports.crearSuscripcionCurso = async (req, res) => {
    try {
        const nuevaSuscripcion = await Suscripcion_curso.create(req.body);
        res.status(201).json({ success: true, data: nuevaSuscripcion });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.listarSuscripcionesCurso = async (req, res) => {
    try {
        const suscripciones = await Suscripcion_curso.findAll();
        res.status(200).json({ success: true, data: suscripciones });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.actualizarSuscripcionCurso = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Suscripcion_curso.update(req.body, { where: { id } });
        if (updated) {
            const suscripcionActualizada = await Suscripcion_curso.findByPk(id);
            return res.status(200).json({ success: true, data: suscripcionActualizada });
        }
        return res.status(404).json({ success: false, message: 'Suscripción a curso no encontrada' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.eliminarSuscripcionCurso = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Suscripcion_curso.destroy({ where: { id } });
        if (deleted) {
            return res.status(200).json({ success: true, message: 'Suscripción a curso eliminada' });
        }
        return res.status(404).json({ success: false, message: 'Suscripción a curso no encontrada' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Métodos adicionales específicos para Suscripcion_curso
exports.obtenerSuscripcionesPorCurso = async (req, res) => {
    try {
        const { cursoId } = req.params;
        const suscripciones = await Suscripcion_curso.findAll({ 
            where: { curso_id: cursoId }
        });
        res.status(200).json({ success: true, data: suscripciones });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.obtenerSuscripcionesPorUsuario = async (req, res) => {
    try {
        const { usuarioId } = req.params;
        const suscripciones = await Suscripcion_curso.findAll({ 
            where: { usuario_id: usuarioId }
        });
        res.status(200).json({ success: true, data: suscripciones });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.verificarSuscripcion = async (req, res) => {
    try {
        const { usuarioId, cursoId } = req.params;
        const suscripcion = await Suscripcion_curso.findOne({ 
            where: { 
                usuario_id: usuarioId, 
                curso_id: cursoId 
            }
        });
        
        res.status(200).json({ 
            success: true, 
            data: {
                suscrito: !!suscripcion,
                fecha_suscripcion: suscripcion?.fecha_suscripcion || null
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};