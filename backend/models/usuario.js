module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        id_feligres: DataTypes.INTEGER,
        correo: DataTypes.STRING,   
        password: DataTypes.STRING,
        id_rol: DataTypes.INTEGER,
        activo: { type: DataTypes.BOOLEAN, defaultValue: true }
    });
    return Usuario;
};