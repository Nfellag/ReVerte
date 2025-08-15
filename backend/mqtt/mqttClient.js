const mqtt = require('mqtt');
const dotenv = require('dotenv');
const { checkThresholds } = require('../services/alerts');

dotenv.config();

const client = mqtt.connect(process.env.MQTT_BROKER);
const topic = process.env.MQTT_TOPIC;

client.on('connect', () => {
  console.log(`📡 Connecté au broker MQTT`);
  client.subscribe(topic, (err) => {
    if (err) console.error('Erreur de souscription MQTT:', err);
  });
});

client.on('message', (topic, message) => {
  try {
    const data = JSON.parse(message.toString());
    const { capteur_id, temperature, humidite } = data;
    console.log(`📥 Données reçues MQTT:`, data);
    checkThresholds(capteur_id, temperature, humidite);
  } catch (error) {
    console.error('❌ Erreur MQTT:', error.message);
  }
});