const db = require('../models');
const Grupos = db.Grupos;

// Crear grupo
exports.crearGrupo = async (req, res) => {
    try {
        const nuevoGrupo = await Grupos.create(req.body);
        res.status(201).json({ success: true, data: nuevoGrupo });
    } catch (error) {
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
        const [updated] = await Grupos.update(req.body, { where: { id } });
        if (updated) {
            const grupoActualizado = await Grupos.findByPk(id);
            return res.status(200).json({ success: true, data: grupoActualizado });
        }
        return res.status(404).json({ success: false, message: 'Grupo no encontrado' });
    } catch (error) {
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