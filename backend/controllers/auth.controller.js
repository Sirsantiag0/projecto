const db = require('../models');
const Usuario = db.Usuario;
const Roles = db.Roles;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
  const { correo, password } = req.body;
  try {
    const usuario = await Usuario.findOne({
      where: { correo },
      include: [{ model: Roles, attributes: ['descripcion'] }]
    });

    if (!usuario) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const esValido = await bcrypt.compare(password, usuario.password);
    if (!esValido) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Extraemos id_rol y descripción del rol
    const rolDescripcion = usuario.Roles ? usuario.Roles.descripcion : null;
    const idRol = usuario.id_rol ? usuario.id_rol : null;

    const token = jwt.sign(
      {
        id: usuario.id,
        correo: usuario.correo,
        id_rol: idRol,        // 🔑 ID del rol
        rol: rolDescripcion   // 🔑 Descripción del rol
      },
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: {
        id: usuario.id,
        correo: usuario.correo,
        id_rol: idRol,
        rol: rolDescripcion
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
