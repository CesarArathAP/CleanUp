const express = require('express');
const router = express.Router();
const { createPost, upload } = require('../controllers/create_post');

// Ruta para crear una publicación (procesa imágenes con Multer)
router.post('/', upload.array('imagenes'), createPost);

module.exports = router;
