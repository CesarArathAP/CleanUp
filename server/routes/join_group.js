const express = require('express');
const { joinGroup } = require('../controllers/join_group');
const router = express.Router();

router.post('/', joinGroup);

module.exports = router;
