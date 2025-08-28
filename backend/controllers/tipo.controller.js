const db = require('../models');
const Tipo = db.Tipo;

// Crear tipo
exports.crearTipo = async (req, res) => {
    try {
        const nuevoTipo = await Tipo.create(req.body);
        res.status(201).json({ success: true, data: nuevoTipo });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Listar tipos
exports.listarTipos = async (req, res) => {
    try {
        const tipos = await Tipo.findAll();
        res.status(200).json({ success: true, data: tipos });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Obtener un tipo específico
exports.obtenerTipo = async (req, res) => {
    try {
        const { id } = req.params;
        const tipo = await Tipo.findByPk(id);
        if (tipo) {
            return res.status(200).json({ success: true, data: tipo });
        }
        return res.status(404).json({ success: false, message: 'Tipo no encontrado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Actualizar tipo
exports.actualizarTipo = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Tipo.update(req.body, { where: { id } });
        if (updated) {
            const tipoActualizado = await Tipo.findByPk(id);
            return res.status(200).json({ success: true, data: tipoActualizado });
        }
        return res.status(404).json({ success: false, message: 'Tipo no encontrado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Inactivar tipo
exports.inactivarTipo = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Tipo.update(
            { activo: false },
            { where: { id } }
        );
        if (updated) {
            return res.status(200).json({ success: true, message: 'Tipo inactivado' });
        }
        return res.status(404).json({ success: false, message: 'Tipo no encontrado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Eliminar tipo
exports.eliminarTipo = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Tipo.destroy({ where: { id } });
        if (deleted) {
            return res.status(200).json({ success: true, message: 'Tipo eliminado' });
        }
        return res.status(404).json({ success: false, message: 'Tipo no encontrado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};