module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define("roles", {
    descripcion: DataTypes.STRING,
  });
  return Roles;
};
