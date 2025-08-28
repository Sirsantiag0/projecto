module.exports = (sequelize, DataTypes) => {
    const Feligres = sequelize.define('Feligres', {
        cedula: { type: DataTypes.STRING, unique: true },
        nombres: DataTypes.STRING,
        apellidos: DataTypes.STRING,
        fecha_nacimiento: DataTypes.DATE,
        edad: DataTypes.INTEGER,
        genero: DataTypes.STRING,
        direccion: DataTypes.STRING,
        telefono: DataTypes.STRING,
        email: DataTypes.STRING,
        activo: { type: DataTypes.BOOLEAN, defaultValue: true }
    });
    return Feligres;
};