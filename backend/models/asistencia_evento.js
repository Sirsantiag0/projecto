module.exports = (sequelize, DataTypes) => {
    const Asistencia_evento = sequelize.define('asistencia_evento', {
        id_feligres: DataTypes.INTEGER,
        id_evento: DataTypes.INTEGER,
        activo: { type: DataTypes.BOOLEAN, defaultValue: true }
    });
    return Asistencia_evento;
};