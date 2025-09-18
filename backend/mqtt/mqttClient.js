console.log("🧪 mqttClient.js chargé");

console.log("🌱 Variables .env:", {
  broker: process.env.MQTT_BROKER_URL,
  topic: process.env.MQTT_TOPIC
});

const mqtt = require('mqtt');
const { checkThresholds } = require('../services/alerts');

const client = mqtt.connect(process.env.MQTT_BROKER_URL);
const topic = process.env.MQTT_TOPIC;

client.on('connect', () => {
  console.log(`📡 Connecté au broker MQTT`);
  client.subscribe(topic, (err) => {
    if (err) {
      console.error('❌ Erreur de souscription MQTT:', err);
    } else {
      console.log(`📶 Souscription au topic : ${topic}`);
    }
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