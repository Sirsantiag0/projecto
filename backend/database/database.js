// backend/database/database.js
module.exports = {
  username: 'admin',
  password: 'admin',
  database: 'iglesia',
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};