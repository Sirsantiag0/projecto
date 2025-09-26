const env = process.env.NODE_ENV || 'development';
const environmentConfig = require('../config/config.js')[env];

if (!environmentConfig) {
  throw new Error(`No database configuration found for environment: ${env}`);
}

const connectionUri = environmentConfig.use_env_variable
  ? process.env[environmentConfig.use_env_variable]
  : null;

const { database, username, password, use_env_variable, ...options } = environmentConfig;
module.exports = {
  database,
  username,
  password,
  options,
  connectionUri,
};