const db = require('../models');
const Cursos = db.Cursos;

// Crear Curso 
exports.crearCurso = async (req, res) => {
    try {
        const nuevoCurso = await Cursos.create(req.body);
        res.status(201).json({ success: true, data: nuevoCurso });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Listar Curso 
exports.listarCursos = async (req, res) => {
    try {
        const cursos = await Cursos.findAll();
        res.status(200).json({ success: true, data: cursos });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Obtener un curso específico
exports.obtenerCurso = async (req, res) => {
    try {
        const { id } = req.params;
        const curso = await Cursos.findByPk(id);
        if (curso) {
            return res.status(200).json({ success: true, data: curso });
        }
        return res.status(404).json({ success: false, message: 'Curso no encontrado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Actualizar curso 
exports.actualizarCurso = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Cursos.update(req.body, { where: { id } });
        if (updated) {
            const cursoActualizado = await Cursos.findByPk(id); 
            return res.status(200).json({ success: true, data: cursoActualizado });
        }
        return res.status(404).json({ success: false, message: 'Curso no encontrado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Inactivar Curso 
exports.inactivarServicio = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Cursos.update(
            { activo: false },
            { where: { id } }
        );
        if (updated) {
            return res.status(200).json({ success: true, message: 'Curso inactivado' });
        }
        return res.status(404).json({ success: false, message: 'Curso no encontrado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Eliminar Cruo
exports.eliminarCurso = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Cursos.destroy({ where: { id } });
        if (deleted) {
            return res.status(200).json({ success: true, message: 'Curso eliminado' });
        }
        return res.status(404).json({ success: false, message: 'Curso no encontrado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};