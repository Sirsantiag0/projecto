const db = require('../models');
const Feligres = db.Feligres;
const Usuario = db.Usuario;
const bcrypt = require('bcryptjs');

exports.crearFeligres = async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
        const { password, email, ...feligresData } = req.body;
        const nuevoFeligres = await Feligres.create({ ...feligresData, email }, { transaction: t });

        const hashedPassword = await bcrypt.hash(password, 10);
        const nuevoUsuario = await Usuario.create({
            id_feligres: nuevoFeligres.id,
            correo: email,
            password: hashedPassword
        }, { transaction: t });

        await t.commit();
        res.status(201).json({ success: true, data: { feligres: nuevoFeligres, usuario: nuevoUsuario } });
    } catch (error) {
        await t.rollback();
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.listarFeligreses = async (req, res) => {
    try {
        const feligres = await Feligres.findAll();
        res.status(200).json({ success: true, data: feligres });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.actualizarFeligres = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Feligres.update(req.body, { where: { id } });
        if (updated) {
            const feligresActualizado = await Feligres.findByPk(id);
            // enviar variable desde el front
            return res.status(200).json({ success: true, data: feligresActualizado });
        }
        return res.status(404).json({ success: false, message: 'Feligres no encontrado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.eliminarFeligres = async (req, res) => {
    try {
        const { id } = req.params;
        // Eliminar Feligres 
        const deleted = await db.Feligres.destroy({ where: { id } });
        if (deleted) {
            return res.status(200).json({ success: true, message: 'Feligres Eliminado' });
        }
        return res.status(404).json({ success: false, message: 'Feligres no encontrado' });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

