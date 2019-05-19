require('dotenv').config();

const localPG = db => ({
  host: process.env.HOST,
  database: db,
  user: process.env.USER,
  password: process.env.PASS || ''
});

const pgTest = localPG(process.env.DB_TEST);
const pgDev = localPG(process.env.DB_DEV);

const dbSettings = (connection, seedDir) => ({
  client: 'pg',
  connection,
  pool: {
    min: 2,
    max: 10
  },
  useNullAsDefault: true,
  migrations: {
    directory: './data/migrations',
    tableName: 'dbmigrations'
  },
  seeds: {
    directory: `./data/seeds/${seedDir}`
  }
});

module.exports = {
  test: dbSettings(pgTest, 'test'),
  development: dbSettings(pgDev, 'dev'),
  production: dbSettings(process.env.DATABASE_URL, 'prod')
};
