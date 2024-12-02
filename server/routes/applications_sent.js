const express = require('express');
const router = express.Router();
const { handleApplication } = require('../controllers/applications_sent');

// Ruta para gestionar solicitudes
router.post('/', handleApplication);

module.exports = router;
