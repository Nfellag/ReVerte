const config = require('../config');

function requireIngestKey(req, res, next) {
  const key = req.header('x-api-key');
  if (!key || key !== config.apiIngestKey) {
    return res.status(401).json({ error: 'Unauthorized: invalid or missing x-api-key' });
  }
  next();
}

module.exports = { requireIngestKey };
