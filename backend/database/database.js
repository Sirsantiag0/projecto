const env = process.env.NODE_ENV || 'development';
const environmentConfig = require('../config/config.js')[env];

if (!environmentConfig) {
  throw new Error(`No database configuration found for environment: ${env}`);
}

const connectionUri = environmentConfig.use_env_variable
  ? process.env[environmentConfig.use_env_variable]
  : null;

  const sanitizeOptions = (baseOptions, useConnectionUri) => {
  if (!baseOptions) {
    return {};
  }

  const sanitized = { ...baseOptions };

  if (useConnectionUri) {
    delete sanitized.host;
    delete sanitized.port;
  }

  return sanitized;
};

const { database, username, password, use_env_variable, ...options } = environmentConfig;
const optionsSanitized = sanitizeOptions(options, Boolean(connectionUri));

module.exports = {
  database,
  username,
  password,
  options: optionsSanitized,
  connectionUri,
};