const db = require('../models');
const Eventos = db.Eventos;

// Crear evento 
exports.crearEvento = async (req, res) => {
    try {
        const nuevoEvento = await Eventos.create(req.body); // Corregí Feligres por Eventos
        res.status(201).json({ success: true, data: nuevoEvento });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Listar eventos 
exports.listarEventos = async (req, res) => {
    try {
        const eventos = await Eventos.findAll();
        res.status(200).json({ success: true, data: eventos });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Obtener un evento específico
exports.obtenerEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const evento = await Eventos.findByPk(id);
        if (evento) {
            return res.status(200).json({ success: true, data: evento });
        }
        return res.status(404).json({ success: false, message: 'Evento no encontrado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Actualizar evento 
exports.actualizarEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Eventos.update(req.body, { where: { id } });
        if (updated) {
            const eventoActualizado = await Eventos.findByPk(id); // Cambié Feligres por Eventos
            return res.status(200).json({ success: true, data: eventoActualizado });
        }
        return res.status(404).json({ success: false, message: 'Evento no encontrado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Inactivar evento 
exports.inactivarEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Eventos.update(
            { activo: false },
            { where: { id } }
        );
        if (updated) {
            return res.status(200).json({ success: true, message: 'Evento inactivado' });
        }
        return res.status(404).json({ success: false, message: 'Evento no encontrado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Eliminar evento 
exports.eliminarEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Eventos.destroy({ where: { id } });
        if (deleted) {
            return res.status(200).json({ success: true, message: 'Evento eliminado' });
        }
        return res.status(404).json({ success: false, message: 'Evento no encontrado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};