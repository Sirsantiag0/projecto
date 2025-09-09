const db = require('../models');
const Feligres = db.Feligres;
const Usuario = db.Usuario;
const bcrypt = require('bcryptjs');

exports.crearFeligres = async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
        const { password, email, ...feligresData } = req.body;
        let edad = feligresData.edad;
        if (feligresData.fecha_nacimiento) {
            const birthDate = new Date(feligresData.fecha_nacimiento);
            edad = new Date().getFullYear() - birthDate.getFullYear();
        }
        const nuevoFeligres = await Feligres.create({ ...feligresData, edad, email }, { transaction: t });

        const hashedPassword = await bcrypt.hash(password, 10);
         // Asignar rol de feligrés (id_rol = 3) de forma predeterminada al crear el usuario
        const nuevoUsuario = await Usuario.create({
            id_feligres: nuevoFeligres.id,
            correo: email,
            password: hashedPassword,
            id_rol: 3
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
        const feligres = await Feligres.findAll({
            include: [{
                model: Usuario,
                attributes: ['id', 'id_rol'],
                include: [{ model: db.Roles, attributes: ['descripcion'] }]
            }]
        });
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
        await Usuario.destroy({ where: { id_feligres: id } });
        const deleted = await Feligres.destroy({ where: { id } });
        if (deleted) {
            return res.status(200).json({ success: true, message: 'Feligres Eliminado' });
        }
        return res.status(404).json({ success: false, message: 'Feligres no encontrado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

