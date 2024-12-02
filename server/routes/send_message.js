const express = require('express');
const router = express.Router();
const { sendMessage } = require('../controllers/send_message');

// Ruta para enviar mensajes
router.post('/', sendMessage);

module.exports = router;
