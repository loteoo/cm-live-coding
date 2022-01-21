module.exports = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST || '127.0.0.1',
    database: process.env.DB_NAME || 'postgres',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    port: parseInt(process.env.DB_PORT) || 5432,
    charset: 'utf8mb4'
  }
}