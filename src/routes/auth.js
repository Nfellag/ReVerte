const express = require('express');
const { authenticate } = require('../services/userService');

const router = express.Router();

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: 'Missing email/password' });
    }
    const result = await authenticate(email, password);
    if (!result) return res.status(401).json({ error: 'Invalid credentials' });
    res.json(result);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
