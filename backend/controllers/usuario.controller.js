const db = require('../models');
const Usuario = db.Usuario;
const bcrypt = require('bcryptjs');


// Crear usuario
exports.crearUsuario = async (req, res) => {
    try {
        const { password, ...rest } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const nuevoUsuario = await Usuario.create({ ...rest, password: hashedPassword });
        res.status(201).json({ success: true, data: nuevoUsuario });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Listar usuarios
exports.listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.status(200).json({ success: true, data: usuarios });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Obtener un usuario específico
exports.obtenerUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByPk(id);
        if (usuario) {
            return res.status(200).json({ success: true, data: usuario });
        }
        return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Actualizar usuario
exports.actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Usuario.update(req.body, { where: { id } });
        if (updated) {
            const usuarioActualizado = await Usuario.findByPk(id);
            return res.status(200).json({ success: true, data: usuarioActualizado });
        }
        return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Inactivar usuario
exports.inactivarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Usuario.update(
            { activo: false },
            { where: { id } }
        );
        if (updated) {
            return res.status(200).json({ success: true, message: 'Usuario inactivado' });
        }
        return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Eliminar usuario
exports.eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Usuario.destroy({ where: { id } });
        if (deleted) {
            return res.status(200).json({ success: true, message: 'Usuario eliminado' });
        }
        return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Métodos adicionales para Usuarios
exports.obtenerUsuarioPorEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const usuario = await Usuario.findOne({ 
            where: { email: email }
        });
        if (usuario) {
            return res.status(200).json({ success: true, data: usuario });
        }
        return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


exports.actualizarContrasena = async (req, res) => {
    try {
        const { id } = req.params;
        const { contrasena } = req.body;
const hashedPassword = await bcrypt.hash(contrasena, 10);
        const [updated] = await Usuario.update(
            { password: hashedPassword },

            { where: { id } }
        );
        
        if (updated) {
            return res.status(200).json({ success: true, message: 'Contraseña actualizada' });
        }
        return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};