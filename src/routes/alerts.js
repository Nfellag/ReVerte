const express = require('express');
const pool = require('../db/pool');
const { requireAuth } = require('../middlewares/auth');

const router = express.Router();

router.get('/', requireAuth, async (req, res, next) => {
  try {
    const { limit = 50 } = req.query;
    const { rows } = await pool.query(
      `SELECT a.id, a.sensor_id, a.type, a.value, a.created_at,
              s.lat, s.lng
       FROM alerts a
       JOIN sensors s ON s.id = a.sensor_id
       ORDER BY a.created_at DESC
       LIMIT $1`,
      [Math.min(Number(limit) || 50, 200)]
    );
    res.json(rows);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
