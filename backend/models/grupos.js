module.exports = (sequelize, DataTypes) => {
    const Grupos = sequelize.define('Grupos', {
        titulo: DataTypes.STRING,
        descripcion: DataTypes.STRING,
        ruta_archivo: DataTypes.STRING,
        imagen_mime: DataTypes.STRING,
        imagen_contenido: DataTypes.BLOB('long'),
        activo: { type: DataTypes.BOOLEAN, defaultValue: true }
    });
    return Grupos;   
};