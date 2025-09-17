const db = require('../models');
const Servicios = db.Servicios;
const Requisitos = db.Requisitos;

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
        const servicios = await Servicios.findAll({
            include: [
                {
                    model: Requisitos,
                    attributes: ['id', 'requisito', 'activo'],
                    required: false,
                },
            ],
            order: [
                ['id', 'ASC'],
                [Requisitos, 'id', 'ASC'],
            ],
        });

        const data = servicios.map((servicio) => {
            const { Requisitos: requisitosRelacionados = [], ...resto } = servicio.toJSON();
            const requisitos = Array.isArray(requisitosRelacionados)
                ? requisitosRelacionados
                    .filter((req) => req && req.requisito && req.activo !== false)
                    .map((req) => req.requisito)
                : [];

            return {
                ...resto,
                requisitos,
            };
        });
        res.status(200).json({ success: true, data });
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
    let transaction;
    try {
         transaction = await db.sequelize.transaction();
        const { id } = req.params;

        await Requisitos.destroy({ where: { id_servicio: id }, transaction });

        const deleted = await Servicios.destroy({ where: { id }, transaction });
        if (!deleted) {
            await transaction.rollback();
            return res.status(404).json({ success: false, message: 'Servicio no encontrado' });
        }
        
        await transaction.commit();
        return res.status(200).json({
            success: true,
            message: 'Servicio y requisitos eliminados',
        });
    } catch (error) {
                if (transaction) {
            try {
                await transaction.rollback();
            } catch (rollbackError) {
                console.error('Error al revertir la transacción al eliminar servicio', rollbackError);
            }
        }
        res.status(500).json({ success: false, error: error.message });
    }
};

// estado servicio no necesita