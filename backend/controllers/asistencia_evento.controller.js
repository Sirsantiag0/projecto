    const db = require('../models');
    const Asistencia_evento = db.Asistencia_evento;

    // Crear registro de asistencia a evento
    exports.crearAsistenciaEvento = async (req, res) => {
        try {
            const nuevaAsistencia = await Asistencia_evento.create(req.body);
            res.status(201).json({ success: true, data: nuevaAsistencia });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };

    // Listar todos los registros de asistencia
    exports.listarAsistenciasEvento = async (req, res) => {
        try {
            const asistencias = await Asistencia_evento.findAll();
            res.status(200).json({ success: true, data: asistencias });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };

    // Obtener un registro de asistencia específico
    exports.obtenerAsistenciaEvento = async (req, res) => {
        try {
            const { id } = req.params;
            const asistencia = await Asistencia_evento.findByPk(id);
            if (asistencia) {
                return res.status(200).json({ success: true, data: asistencia });
            }
            return res.status(404).json({ success: false, message: 'Registro de asistencia no encontrado' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };

    // Actualizar registro de asistencia
    exports.actualizarAsistenciaEvento = async (req, res) => {
        try {
            const { id } = req.params;
            const [updated] = await Asistencia_evento.update(req.body, { where: { id } });
            if (updated) {
                const asistenciaActualizada = await Asistencia_evento.findByPk(id);
                return res.status(200).json({ success: true, data: asistenciaActualizada });
            }
            return res.status(404).json({ success: false, message: 'Registro de asistencia no encontrado' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };

    // Inactivar registro de asistencia
    exports.inactivarAsistenciaEvento = async (req, res) => {
        try {
            const { id } = req.params;
            const [updated] = await Asistencia_evento.update(
                { activo: false },
                { where: { id } }
            );
            if (updated) {
                return res.status(200).json({ success: true, message: 'Asistencia inactivada' });
            }
            return res.status(404).json({ success: false, message: 'Registro de asistencia no encontrado' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };

    // Eliminar registro de asistencia
    exports.eliminarAsistenciaEvento = async (req, res) => {
        try {
            const { id } = req.params;
            const deleted = await Asistencia_evento.destroy({ where: { id } });
            if (deleted) {
                return res.status(200).json({ success: true, message: 'Asistencia eliminada' });
            }
            return res.status(404).json({ success: false, message: 'Registro de asistencia no encontrado' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };

    // Obtener asistencias por evento específico
    exports.obtenerAsistenciasPorEvento = async (req, res) => {
        try {
            const { eventoId } = req.params;
            const asistencias = await Asistencia_evento.findAll({ 
                where: { id_evento: eventoId } 
            });
            res.status(200).json({ success: true, data: asistencias });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };

    // Obtener asistencias por feligrés específico
    exports.obtenerAsistenciasPorFeligres = async (req, res) => {
        try {
            const { feligresId } = req.params;
            const asistencias = await Asistencia_evento.findAll({ 
                where: { id_feligres: feligresId } 
            });
            res.status(200).json({ success: true, data: asistencias });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };