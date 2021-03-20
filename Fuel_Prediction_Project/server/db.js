const Pool = require('pg').Pool;

const pool = new Pool({
  host: 'localhost',
  user: 'cosc0177', // this is your postgreSQL or Ubuntu account --- change
  password: 'cosc4353', // this is your postgreSQL or Ubuntu account's password ---- change
  port: 5432,
  database: 'fuelproject' // this is in the dabase.sql
});

module.exports = pool;


