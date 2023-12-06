// config.js
module.exports = {
    port: process.env.PORT || 3000,
    database: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'app',
        password: process.env.DB_PASSWORD || 'wonderful',
        name: process.env.DB_NAME || 'miechallenge',
        connectionLimit: process.env.DB_CONNECTION_LIMIT || 20,
        connectionTimeout: process.env.DB_CONNECTION_TIMEOUT || 30000,
    },
};
