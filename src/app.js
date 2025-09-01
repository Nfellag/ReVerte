const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const config = require('./config');
const { notFound, errorHandler } = require('./middlewares/error');

const sensorsRoute = require('./routes/sensors');
const dashboardRoute = require('./routes/dashboard');
const authRoute = require('./routes/auth');
const alertsRoute = require('./routes/alerts');
const healthRoute = require('./routes/health');

const app = express();

app.use(helmet());
app.use(express.json({ limit: '1mb' }));
if (config.env !== 'test') app.use(morgan(config.logLevel));

app.use('/api/sensors', sensorsRoute);
app.use('/api/dashboard', dashboardRoute);
app.use('/api/auth', authRoute);
app.use('/api/alerts', alertsRoute);
app.use('/health', healthRoute);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
