const pg = require('pg');

const pool = new pg.Pool({
  // name of our database
  // this will change for every app!
  database: 'music_library',
  // where our db is
  // localhost === on your computer
  host: 'localhost',
  // Postgres listens for network connections on port 5432 by default
  port: 5432
})

module.exports = pool;