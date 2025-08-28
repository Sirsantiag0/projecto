module.exports = (sequelize, DataTypes) => {
    const Servicios = sequelize.define('Servicios', {
        descripcion: DataTypes.STRING,
        activo: { type: DataTypes.BOOLEAN, defaultValue: true }
    });
    return Servicios;
};