// routes/register.js
const express = require('express');
const { register } = require('../controllers/register');

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/', register);

module.exports = router;