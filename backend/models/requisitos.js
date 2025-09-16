module.exports = (sequelize, DataTypes) => {
    const Requisitos = sequelize.define('Requisitos', {
        id_servicio: DataTypes.INTEGER,
        requisito: DataTypes.STRING,
        activo: { type: DataTypes.BOOLEAN, defaultValue: true }
    });
    return Requisitos;
};