module.exports = (sequelize, DataTypes) => {
    const Empresa = sequelize.define('Empresa', {
        ruc: { type: DataTypes.STRING, unique: true },
        nombre: DataTypes.STRING,
        razon_social: DataTypes.STRING,
        correo: DataTypes.STRING,
        direccion: DataTypes.STRING,
        telefono: DataTypes.STRING,
        activo: { type: DataTypes.BOOLEAN, defaultValue: true }
    });
    return Empresa;
};