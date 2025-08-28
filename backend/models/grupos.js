module.exports = (sequelize, DataTypes) => {
    const Grupos = sequelize.define('Grupos', {
        descripcion: DataTypes.STRING,
        activo: { type: DataTypes.BOOLEAN, defaultValue: true }
    });
    return Grupos;   
};

