const fs = require('fs');
const path = require('path');
const pool = require('../src/db/pool');

async function main() {
  try {
    const sql = fs.readFileSync(path.join(__dirname, '..', 'sql', 'seed.sql'), 'utf-8');
    await pool.query(sql);
    console.log('🌱 Seed completed.');
    process.exit(0);
  } catch (e) {
    console.error('Seed failed:', e);
    process.exit(1);
  }
}

main();
