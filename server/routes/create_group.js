const express = require('express');
const { createGroup } = require('../controllers/create_group');

const router = express.Router();

// Ruta para crear un grupo
router.post('/', createGroup);

module.exports = router;
