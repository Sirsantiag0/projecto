module.exports = (sequelize, DataTypes) => {
    const Suscripcion_grupo = sequelize.define('Suscripcion_grupo', {
        id_feligres: DataTypes.INTEGER,
        id_grupo: DataTypes.INTEGER,
        activo: { type: DataTypes.BOOLEAN, defaultValue: true }
    });
    return Suscripcion_grupo;
};