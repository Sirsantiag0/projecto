module.exports = (sequelize, DataTypes) => {
    const Hoja_dominical = sequelize.define('Hoja_dominical', {
        ruta_archivos: DataTypes.STRING,
        fecha: DataTypes.DATE,
        titulo: DataTypes.STRING,
        activo: { type: DataTypes.BOOLEAN, defaultValue: true }
    });
    return Hoja_dominical;
};