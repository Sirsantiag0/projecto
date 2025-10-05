module.exports = (sequelize, DataTypes) => {
    const Archivos_evento = sequelize.define('Archivos_evento', {
        detalle: DataTypes.STRING,
        ruta_archivos: DataTypes.STRING,
        mime_type: DataTypes.STRING,
        contenido: DataTypes.BLOB('long'),
        activo: { type: DataTypes.BOOLEAN, defaultValue: true }
    });
    return Archivos_evento;
};