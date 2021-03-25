const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres', // this is your postgreSQL or Ubuntu account --- change
  password: 'cosc4353', // this is your postgreSQL or Ubuntu account's password ---- change
  host: "localhost",
  port: 5432,
  database: 'fuelproject' // this is in the dabase.sql, run this in postgres user
});

module.exports = pool;
