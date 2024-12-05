const express = require('express');
const { calculateRanking } = require('../controllers/calculate_rankign');

const router = express.Router();

// Ruta para calcular el ranking
router.post('/', calculateRanking);

module.exports = router;
