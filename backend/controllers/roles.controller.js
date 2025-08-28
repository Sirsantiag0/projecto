const db = require('../models');
const Roles = db.Roles;

// Crear rol
exports.crearRol = async (req, res) => {
    try {
        const nuevoRol = await Roles.create(req.body);
        res.status(201).json({ success: true, data: nuevoRol });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Listar todos los roles
exports.listarRoles = async (req, res) => {
    try {
        const roles = await Roles.findAll();
        res.status(200).json({ success: true, data: roles });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Obtener un rol específico
exports.obtenerRol = async (req, res) => {
    try {
        const { id } = req.params;
        const rol = await Roles.findByPk(id);
        if (rol) {
            return res.status(200).json({ success: true, data: rol });
        }
        return res.status(404).json({ success: false, message: 'Rol no encontrado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Actualizar rol
exports.actualizarRol = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Roles.update(req.body, { where: { id } });
        if (updated) {
            const rolActualizado = await Roles.findByPk(id);
            return res.status(200).json({ success: true, data: rolActualizado });
        }
        return res.status(404).json({ success: false, message: 'Rol no encontrado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Eliminar rol
exports.eliminarRol = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Roles.destroy({ where: { id } });
        if (deleted) {
            return res.status(200).json({ success: true, message: 'Rol eliminado' });
        }
        return res.status(404).json({ success: false, message: 'Rol no encontrado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Métodos adicionales para Roles
exports.asignarPermisos = async (req, res) => {
    try {
        const { id } = req.params;
        const { permisos } = req.body;
        
        const rol = await Roles.findByPk(id);
        if (!rol) {
            return res.status(404).json({ success: false, message: 'Rol no encontrado' });
        }
        
        await rol.setPermisos(permisos);
        return res.status(200).json({ success: true, message: 'Permisos asignados correctamente' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.obtenerPermisos = async (req, res) => {
    try {
        const { id } = req.params;
        const rol = await Roles.findByPk(id, {
            include: [{
                model: db.Permisos,
                as: 'permisos',
                through: { attributes: [] }
            }]
        });
        
        if (!rol) {
            return res.status(404).json({ success: false, message: 'Rol no encontrado' });
        }
        
        res.status(200).json({ success: true, data: rol.permisos });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};