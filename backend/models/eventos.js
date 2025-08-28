module.exports = (sequelize, DataTypes) => {
    const Eventos = sequelize.define('Eventos', {
        id_empresa: DataTypes.INTEGER,
        fecha: DataTypes.DATE,
        hora: DataTypes.TIME,
        descripcion: DataTypes.TEXT,
        usuario: DataTypes.STRING,
        activo: { type: DataTypes.BOOLEAN, defaultValue: true },
    });
    return Eventos;   
};





