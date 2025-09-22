const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');


dotenv.config();


const sensorsRoutes = require('./routes/sensors');
const alertesRoutes = require('./routes/alertes');
require('./mqtt/mqttClient');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/sensors', sensorsRoutes);
app.use('/api/alertes', alertesRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Backend ReVerte démarré sur le port ${PORT}`);
});