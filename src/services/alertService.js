const nodemailer = require('nodemailer');
const TelegramBot = require('node-telegram-bot-api');
const pool = require('../db/pool');
const config = require('../config');

let bot = null;
if (config.telegram.token) {
  bot = new TelegramBot(config.telegram.token, { polling: false });
}

async function canSendAlert(sensorId, type, throttleMinutes) {
  const { rows } = await pool.query(
    `SELECT created_at FROM alerts
     WHERE sensor_id = $1 AND type = $2
     ORDER BY created_at DESC
     LIMIT 1`,
    [sensorId, type]
  );
  if (!rows.length) return true;
  const last = new Date(rows[0].created_at);
  const diffMin = (Date.now() - last.getTime()) / 60000;
  return diffMin >= throttleMinutes;
}

async function recordAlert({ sensorId, type, value, details }) {
  const { rows } = await pool.query(
    `INSERT INTO alerts (sensor_id, type, value, details)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [sensorId, type, value, details || null]
  );
  return rows[0];
}

async function sendEmail(subject, text) {
  const t = nodemailer.createTransport({
    host: config.email.host,
    port: config.email.port,
    secure: config.email.secure,
    auth: config.email.user ? { user: config.email.user, pass: config.email.pass } : undefined,
  });
  await t.sendMail({
    from: config.email.from,
    to: config.email.to,
    subject,
    text,
  });
}

async function sendTelegram(message) {
  if (!bot || !config.telegram.chatId) return;
  await bot.sendMessage(config.telegram.chatId, message);
}

async function alertIfNeeded({ sensor, measurement }) {
  const threshold = config.alerts.tempThresholdC;
  if (measurement.temperature != null && measurement.temperature > threshold) {
    const type = 'TEMP_THRESHOLD_EXCEEDED';
    const allowed = await canSendAlert(sensor.id, type, config.alerts.throttleMinutes);
    if (!allowed) return null;

    const details = {
      lat: sensor.lat,
      lng: sensor.lng,
      recorded_at: measurement.recorded_at,
      temperature: measurement.temperature,
      threshold,
    };

    const alert = await recordAlert({
      sensorId: sensor.id,
      type,
      value: measurement.temperature,
      details,
    });

    const subject = `Alerte chaleur: capteur ${sensor.id} à ${measurement.temperature}°C (> ${threshold}°C)`;
    const text = `Zone critique détectée:
- Capteur: ${sensor.id}
- Position: ${sensor.lat}, ${sensor.lng}
- Température: ${measurement.temperature}°C (seuil ${threshold}°C)
- Horodatage: ${measurement.recorded_at}`;

    // Fire and forget (no await for speed, but log errors)
    sendEmail(subject, text).catch(console.error);
    sendTelegram(`🔥 ${subject}
${text}`).catch(console.error);

    return alert;
  }
  return null;
}

module.exports = { alertIfNeeded };
