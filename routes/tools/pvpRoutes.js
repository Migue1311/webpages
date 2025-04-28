const express = require('express');
const pvpController = require('../../controllers/tools/pvpController.js');

const router = express.Router();

router.post('/calculate-pvp', pvpController.calculatePvp);

router.post('/calculate-margin', pvpController.calculateMargin);
module.exports = router;