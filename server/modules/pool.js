const pg = require('pg');

const pool = new pg.Pool({
  database: 'weekend-to-do-app', // named current database, rest here is boilerplate
  host: 'localhost',
  port: 5432
});

module.exports = pool;