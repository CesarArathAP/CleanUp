const express = require('express');
const router = express.Router();
const { startActivity } = require('../controllers/activities');

// Ruta para iniciar una actividad de recolección
router.post('/', startActivity);

module.exports = router;
