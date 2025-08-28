module.exports = (sequelize, DataTypes) => {
    const Qr_evento = sequelize.define('Qr_evento', {
        ruta_qr: DataTypes.STRING,
        activo: { type: DataTypes.BOOLEAN, defaultValue: true }
    });
    return Qr_evento;
};