// app.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const contactRoutes = require('./routes/contactRoutes');
const pvpRoutes = require('./routes/tools/pvpRoutes.js');
const txtRoutes = require('./routes/tools/txtRoutes.js');
const fileUpload = require('express-fileupload');

dotenv.config();
// Crear la aplicación Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Rutas
app.use('/api/contacts', contactRoutes);
app.use('/api/pvp', pvpRoutes);
app.use('/api/converter', txtRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;