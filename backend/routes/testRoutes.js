const express = require('express');
const router = express.Router();

const protect = require('../middleware/authMiddleware');

router.get('/private', protect, (req, res) => {
  res.json({
    message: 'You accessed protected route',
    user: req.user
  });
});

module.exports = router;