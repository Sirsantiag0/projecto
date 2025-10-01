module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define("Video", {
    enlace: DataTypes.STRING,
    activo: { type: DataTypes.BOOLEAN, defaultValue: true },
  });
  return Video;
};
