const db = require('../models');
const Requisitos = db.Requisitos;

// Crear servicio 
exports.crearRequisito = async (req, res) => {
    try {
        const nuevoRequisito = await Requisitos.create(req.body);
        res.status(201).json({ success: true, data: nuevoRequisito });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Listar requisitos 
exports.listarRequisitos = async (req, res) => {
    try {
        const requisitos = await Requisitos.findAll();
        res.status(200).json({ success: true, data: requisitos });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Obtener un requisito específico
exports.obtenerRequisito = async (req, res) => {
    try {
        const { id } = req.params;
        const requisito = await Requisitos.findByPk(id);
        if (requisito) {
            return res.status(200).json({ success: true, data: requisito });
        }
        return res.status(404).json({ success: false, message: 'Requisito no encontrado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Actualizar requisito (
exports.actualizarRequisito = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Requisitos.update(req.body, { where: { id } });
        if (updated) {
            const requisitoActualizado = await Requisitos.findByPk(id);
            return res.status(200).json({ success: true, data: requisitoActualizado });
        }
        return res.status(404).json({ success: false, message: 'Requisito no encontrado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Inactivar servicio 
exports.inactivarRequisito = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Requisitos.update(
            { activo: false },
            { where: { id } }
        );
        if (updated) {
            return res.status(200).json({ success: true, message: 'Requisito inactivado' });
        }
        return res.status(404).json({ success: false, message: 'Requisito no encontrado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Eliminar requisito 
exports.eliminarRequisito = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Requisitos.destroy({ where: { id } });
        if (deleted) {
            return res.status(200).json({ success: true, message: 'Requisito eliminado' });
        }
        return res.status(404).json({ success: false, message: 'Requisito no encontrado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
