const express = require('express');
const router = express.Router();
const { getPublicationsController } = require('../controllers/get_publications');

// Ruta para obtener todas las publicaciones
router.get('/', getPublicationsController);

module.exports = router;
