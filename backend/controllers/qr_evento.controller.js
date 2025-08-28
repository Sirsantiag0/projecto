const db = require('../models');
const Qr_evento = db.Qr_evento;

// Crear QR para evento
exports.crearQrEvento = async (req, res) => {
    try {
        const nuevoQr = await Qr_evento.create(req.body);
        res.status(201).json({ success: true, data: nuevoQr });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Listar todos los QR de eventos
exports.listarQrEventos = async (req, res) => {
    try {
        const qrs = await Qr_evento.findAll({
            include: [{
                model: db.Eventos,
                as: 'evento',
                attributes: ['descripcion', 'fecha']
            }]
        });
        res.status(200).json({ success: true, data: qrs });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Obtener un QR específico
exports.obtenerQrEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const qr = await Qr_evento.findByPk(id, {
            include: [{
                model: db.Eventos,
                as: 'evento',
                attributes: ['descripcion', 'fecha']
            }]
        });
        if (qr) {
            return res.status(200).json({ success: true, data: qr });
        }
        return res.status(404).json({ success: false, message: 'QR de evento no encontrado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Actualizar QR de evento
exports.actualizarQrEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Qr_evento.update(req.body, { where: { id } });
        if (updated) {
            const qrActualizado = await Qr_evento.findByPk(id);
            return res.status(200).json({ success: true, data: qrActualizado });
        }
        return res.status(404).json({ success: false, message: 'QR de evento no encontrado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Inactivar QR de evento
exports.inactivarQrEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Qr_evento.update(
            { activo: false },
            { where: { id } }
        );
        if (updated) {
            return res.status(200).json({ success: true, message: 'QR de evento inactivado' });
        }
        return res.status(404).json({ success: false, message: 'QR de evento no encontrado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Eliminar QR de evento
exports.eliminarQrEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Qr_evento.destroy({ where: { id } });
        if (deleted) {
            return res.status(200).json({ success: true, message: 'QR de evento eliminado' });
        }
        return res.status(404).json({ success: false, message: 'QR de evento no encontrado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Obtener QR por evento específico
exports.obtenerQrPorEvento = async (req, res) => {
    try {
        const { eventoId } = req.params;
        const qr = await Qr_evento.findOne({ 
            where: { id_evento: eventoId },
            include: [{
                model: db.Eventos,
                as: 'evento',
               attributes: ['descripcion', 'fecha']
            }]
        });
        if (qr) {
            return res.status(200).json({ success: true, data: qr });
        }
        return res.status(404).json({ success: false, message: 'No se encontró QR para este evento' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Validar QR
exports.validarQr = async (req, res) => {
    try {
        const { codigo } = req.params;
        const qr = await Qr_evento.findOne({ 
            where: { codigo_qr: codigo, activo: true },
            include: [{
                model: db.Eventos,
                as: 'evento',
                attributes: ['id', 'descripcion', 'fecha']
            }]
        });
        
        if (qr) {
            return res.status(200).json({ 
                success: true, 
                data: {
                    valido: true,
                    evento: qr.evento,
                    fecha_generacion: qr.createdAt
                }
            });
        }
        
        return res.status(200).json({ 
            success: true, 
            data: { valido: false }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};