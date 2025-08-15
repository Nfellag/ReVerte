const express = require('express');
const router = express.Router();
const pool = require('../db/pool');

// GET /api/alertes
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM alertes ORDER BY date DESC LIMIT 50');
    res.json(result.rows);
  } catch (error) {
    console.error('Erreur récupération alertes:', error.message);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;