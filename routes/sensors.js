const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const { checkThresholds } = require('../services/alerts');

// POST /api/sensors
router.post('/', async (req, res) => {
  const { capteur_id, temperature, humidite } = req.body;
  try {
    await pool.query(
      'INSERT INTO mesures (id_capteur, temperature, humidite, timestamp) VALUES ($1, $2, $3, NOW())',
      [capteur_id, temperature, humidite]
    );
    checkThresholds(capteur_id, temperature, humidite); // Vérification des seuils
    res.status(201).json({ message: 'Mesure enregistrée' });
  } catch (error) {
    console.error('Erreur enregistrement mesure:', error.message);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;