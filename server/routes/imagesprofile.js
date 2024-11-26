const express = require('express');
const { getImageProfile } = require('../controllers/imagesprofile');

// Crear un enrutador
const router = express.Router();

// Ruta para obtener la imagen del perfil
router.get('/:id/:imageName', getImageProfile);

module.exports = router;