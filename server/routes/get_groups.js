const express = require('express');
const router = express.Router();
const { getGroupById } = require('../controllers/get_groups');

// Ruta para obtener un grupo por su ObjectId
router.get('/:oid', getGroupById);

module.exports = router;
