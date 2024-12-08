const express = require('express');
const router = express.Router();
const { grantReward } = require('../controllers/grant_rewards');

// Ruta para otorgar recompensas
router.post('/', grantReward);

module.exports = router;
