const db = require('../models');
const Servicios = db.Servicios;

// Crear servicio 
exports.crearServicio = async (req, res) => {
    try {
        const nuevoServicio = await Servicios.create(req.body);
        res.status(201).json({ success: true, data: nuevoServicio });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Listar servicios 
exports.listarServicios = async (req, res) => {
    try {
        const servicios = await Servicios.findAll();
        res.status(200).json({ success: true, data: servicios });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Obtener un servicio específico
exports.obtenerServicio = async (req, res) => {
    try {
        const { id } = req.params;
        const servicio = await Servicios.findByPk(id);
        if (servicio) {
            return res.status(200).json({ success: true, data: servicio });
        }
        return res.status(404).json({ success: false, message: 'Servicio no encontrado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Actualizar servicio (
exports.actualizarServicio = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Servicios.update(req.body, { where: { id } });
        if (updated) {
            const servicioActualizado = await Servicios.findByPk(id);
            return res.status(200).json({ success: true, data: servicioActualizado });
        }
        return res.status(404).json({ success: false, message: 'Servicio no encontrado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Inactivar servicio 
exports.inactivarServicio = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Servicios.update(
            { activo: false },
            { where: { id } }
        );
        if (updated) {
            return res.status(200).json({ success: true, message: 'Servicio inactivado' });
        }
        return res.status(404).json({ success: false, message: 'Servicio no encontrado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Eliminar servicio 
exports.eliminarServicio = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Servicios.destroy({ where: { id } });
        if (deleted) {
            return res.status(200).json({ success: true, message: 'Servicio eliminado' });
        }
        return res.status(404).json({ success: false, message: 'Servicio no encontrado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// estado servicio no necesita