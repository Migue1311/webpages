// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController.js');

// Ruta para crear un nuevo contacto
router.post('/', contactController.createContact);

// Ruta para probar la conexión a Gmail
router.get('/test-email', contactController.testEmailConnection);

module.exports = router;