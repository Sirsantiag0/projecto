module.exports = (sequelize, DataTypes) => {
    const Cursos = sequelize.define('Cursos', {
        detalle: DataTypes.STRING,
        fecha: DataTypes.DATE,
        hora: DataTypes.DATE,
        activo: { type: DataTypes.BOOLEAN, defaultValue: true }
    });
    return Cursos;
};  