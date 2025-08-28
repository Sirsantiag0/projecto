module.exports = (sequelize, DataTypes) => {
    const Suscripcion_curso = sequelize.define('Suscripcion_curso', {
        id_feligres: DataTypes.INTEGER,
        id_curso: DataTypes.INTEGER,
        id_servicio: DataTypes.INTEGER,
        activo: { type: DataTypes.BOOLEAN, defaultValue: true }
    });
    return Suscripcion_curso;
};

// construir api
