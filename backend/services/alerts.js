const pool = require('../db/pool');
const { sendAlertEmail } = require('./mailer');

const TEMP_THRESHOLD = parseFloat(process.env.TEMP_THRESHOLD);
const HUMIDITY_THRESHOLD = parseFloat(process.env.HUMIDITY_THRESHOLD);

async function checkThresholds(capteur_id, temperature, humidite) {
  if (temperature > TEMP_THRESHOLD) {
    await registerAlert(capteur_id, 'température', temperature);
  }
  if (humidite > HUMIDITY_THRESHOLD) {
    await registerAlert(capteur_id, 'humidité', humidite);
  }
}

async function registerAlert(capteur_id, type, valeur) {
  try {
    await pool.query(
      'INSERT INTO alertes (capteur_id, type, valeur, date) VALUES ($1, $2, $3, NOW())',
      [capteur_id, type, valeur]
    );
    console.log(`⚠️ Alerte générée: ${type} = ${valeur}`);

    // Envoi de l'e-mail d'alerte
    sendAlertEmail(
      `⚠️ Alerte - ${type.toUpperCase()} critique`,
      `Un seuil critique a été dépassé.\n\nCapteur : ${capteur_id}\nType : ${type}\nValeur : ${valeur}\nDate : ${new Date().toLocaleString()}`
    );
  } catch (error) {
    console.error('Erreur enregistrement alerte:', error.message);
  }
}

module.exports = { checkThresholds };