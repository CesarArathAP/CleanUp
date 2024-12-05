const express = require('express');
const router = express.Router();
const { giveLike } = require('../controllers/give_like');

// Ruta para dar like a una publicación
router.post('/', giveLike);

module.exports = router;
