module.exports = (sequelize, DataTypes) => {
    const Tipo = sequelize.define('Tipo', {
        descripcion: DataTypes.STRING,
    });
    return Tipo;
};  