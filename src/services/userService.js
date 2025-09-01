const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db/pool');
const config = require('../config');

async function createUser({ name, email, password, role, org }) {
  const hash = await bcrypt.hash(password, 10);
  const { rows } = await pool.query(
    `INSERT INTO users (name, email, password_hash, role, organization)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, name, email, role, organization, created_at`,
    [name, email, hash, role || 'ong', org || null]
  );
  return rows[0];
}

async function authenticate(email, password) {
  const { rows } = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
  if (!rows.length) return null;
  const u = rows[0];
  const ok = await bcrypt.compare(password, u.password_hash);
  if (!ok) return null;
  const token = jwt.sign({ sub: u.id, role: u.role, email: u.email }, config.jwtSecret, { expiresIn: '7d' });
  return { token };
}

module.exports = { createUser, authenticate };
