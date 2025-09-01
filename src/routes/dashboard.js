const express = require('express');
const pool = require('../db/pool');

const router = express.Router();

/**
 * GET /api/dashboard
 * Public endpoint for the frontend: returns latest per-sensor metrics and simple aggregates.
 */
router.get('/', async (req, res, next) => {
  try {
    // Latest measurement per sensor
    const latestSql = `
      SELECT DISTINCT ON (m.sensor_id)
        m.sensor_id, s.type, s.lat, s.lng, s.last_activity,
        m.temperature, m.humidity, m.pressure, m.recorded_at
      FROM measurements m
      JOIN sensors s ON s.id = m.sensor_id
      ORDER BY m.sensor_id, m.recorded_at DESC
    `;
    const latest = (await pool.query(latestSql)).rows;

    // Max temp in last 24h
    const max24Sql = `
      SELECT MAX(temperature) AS max_temp_24h
      FROM measurements
      WHERE recorded_at >= NOW() - INTERVAL '24 hours'
    `;
    const max24 = (await pool.query(max24Sql)).rows[0].max_temp_24h;

    // Recent alerts (last 24h)
    const alertsSql = `
      SELECT id, sensor_id, type, value, created_at
      FROM alerts
      WHERE created_at >= NOW() - INTERVAL '24 hours'
      ORDER BY created_at DESC
      LIMIT 100
    `;
    const recentAlerts = (await pool.query(alertsSql)).rows;

    res.json({
      updated_at: new Date().toISOString(),
      latest_per_sensor: latest,
      aggregates: { max_temp_24h: max24 },
      recent_alerts: recentAlerts,
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
