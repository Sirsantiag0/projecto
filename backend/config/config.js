const parseNumber = (value, fallback) => {
  if (value === undefined || value === null || value === '') {
    return fallback;
  }

  const parsed = Number(value);
  return Number.isNaN(parsed) ? fallback : parsed;
};

const buildBaseConfig = () => {
  const sslEnabled = String(process.env.DB_SSL).toLowerCase() === 'true';
  const dialectOptions = sslEnabled
    ? { ssl: { require: true, rejectUnauthorized: false } }
    : {};

  return {
    username:
      process.env.DB_USER || process.env.DB_USERNAME || process.env.DB_USER_NAME || 'admin',
    password:
      process.env.DB_PASSWORD || process.env.DB_PASS || process.env.DB_USER_PASSWORD || 'admin',
    database: process.env.DB_NAME || 'iglesia',
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseNumber(process.env.DB_PORT, 3306),
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: String(process.env.DB_LOGGING).toLowerCase() === 'true',
    pool: {
      max: parseNumber(process.env.DB_POOL_MAX, 5),
      min: parseNumber(process.env.DB_POOL_MIN, 0),
      acquire: parseNumber(process.env.DB_POOL_ACQUIRE, 30000),
      idle: parseNumber(process.env.DB_POOL_IDLE, 10000),
    },
    ...(Object.keys(dialectOptions).length > 0 ? { dialectOptions } : {}),
  };
};

const applyConnectionUrl = (config) => {
  if (!process.env.DATABASE_URL) {
    return config;
  }

  return {
    ...config,
    use_env_variable: 'DATABASE_URL',
  };
};

module.exports = {
  development: buildBaseConfig(),
  production: applyConnectionUrl({
    ...buildBaseConfig(),
    logging: String(process.env.DB_LOGGING).toLowerCase() === 'true',
  }),
  test: {
    ...buildBaseConfig(),
    database: process.env.DB_NAME_TEST || 'iglesia_test',
  },
};