module.exports = (sequelize, DataTypes) => {
    const Archivos_grupo = sequelize.define('Archivos_grupo', {
        ruta_archivos: DataTypes.STRING,
            id_grupo: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        activo: { type: DataTypes.BOOLEAN, defaultValue: true }
    });
    return Archivos_grupo;   
};
