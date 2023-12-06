const mariadb = require('mariadb');
const config = require('./config');

const pool = mariadb.createPool({
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  database: config.database.name,
  connectionLimit: config.database.connectionLimit,
  connectionTimeout: config.database.connectionTimeout,
});

module.exports = {
  pool,
};
