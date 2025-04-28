const express = require('express');
const toolsController = require('../../controllers/tools/txtController'); // 

const router = express.Router();

// Ruta para procesar archivos TXT
router.post('/process-txt', toolsController.processTxtFiles);

module.exports = router;
