const express = require('express');
const pool = require('../db/pool');
const { alertIfNeeded } = require('../services/alertService');
const { isFiniteNumber, requiredString } = require('../utils/validation');
const { requireIngestKey } = require('../middlewares/apiKey');

const router = express.Router();

/**
 * POST /api/sensors
 * Receives measurements from gateways (Raspberry Pi/Linux).
 * Expects JSON body with:
 * - sensor_id (string), type (string), lat (number), lng (number),
 * - temperature (number), humidity (number), pressure (number),
 * - timestamp (ISO string)
 */
router.post('/', requireIngestKey, async (req, res, next) => {
  try {
    const b = req.body || {};
    if (!requiredString(b.sensor_id)) return res.status(400).json({ error: 'sensor_id is required' });
    if (!requiredString(b.type)) return res.status(400).json({ error: 'type is required' });
    if (!isFiniteNumber(b.lat) || !isFiniteNumber(b.lng)) return res.status(400).json({ error: 'lat/lng must be numbers' });
    if (!isFiniteNumber(b.temperature)) return res.status(400).json({ error: 'temperature must be a number' });
    if (b.humidity != null && !isFiniteNumber(b.humidity)) return res.status(400).json({ error: 'humidity must be a number' });
    if (b.pressure != null && !isFiniteNumber(b.pressure)) return res.status(400).json({ error: 'pressure must be a number' });

    const recordedAt = b.timestamp ? new Date(b.timestamp) : new Date();
    if (isNaN(recordedAt.getTime())) return res.status(400).json({ error: 'timestamp is invalid' });

    // Upsert sensor
    const { rows: sensorRows } = await pool.query(
      `INSERT INTO sensors (id, type, lat, lng, last_activity)
       VALUES ($1, $2, $3, $4, NOW())
       ON CONFLICT (id) DO UPDATE SET type = EXCLUDED.type, lat = EXCLUDED.lat, lng = EXCLUDED.lng, last_activity = NOW()
       RETURNING *`,
      [b.sensor_id, b.type, b.lat, b.lng]
    );
    const sensor = sensorRows[0];

    // Insert measurement
    const { rows: measRows } = await pool.query(
      `INSERT INTO measurements (sensor_id, temperature, humidity, pressure, recorded_at)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [b.sensor_id, b.temperature, b.humidity ?? null, b.pressure ?? null, recordedAt.toISOString()]
    );
    const measurement = measRows[0];

    // Alert logic
    const alert = await alertIfNeeded({ sensor, measurement });

    res.status(201).json({ sensor, measurement, alert });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
