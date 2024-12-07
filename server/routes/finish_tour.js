const express = require('express');
const router = express.Router();
const { finishTour } = require('../controllers/finish_tour');

// Ruta para finalizar una actividad de recolección
router.post('/', finishTour);

module.exports = router;
