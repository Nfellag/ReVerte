const { Pool } = require('pg');
const config = require('../config');

const pool = new Pool(config.pg);

pool.on('error', (err) => {
  console.error('Unexpected PG client error', err);
  process.exit(-1);
});

module.exports = pool;
