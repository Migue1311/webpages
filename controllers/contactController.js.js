// controllers/contactController.js
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');
require('dotenv').config();

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const EMAIL_SERVICE = process.env.EMAIL_SERVICE || 'gmail'; // Puedes cambiar el servicio de correo si es necesario

if(!EMAIL_USER || !EMAIL_PASS){
    console.error('Error: Environment variables EMAIL_USER and EMAIL_PASS are required')
}
// Crear el transporter de nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS // Reemplaza con tu contraseña de aplicación (sin espacios)
  }
});

// Función para enviar el correo
const sendEmail = async (contact) => {
  try {
    const mailOptions = {
      from: EMAIL_USER, // Reemplaza con tu correo
      to: EMAIL_SERVICE, // Reemplaza con el correo de la empresa
      subject: `Nuevo contacto de ${contact.businessName}`,
      html: `
        <h2>¡NUEVA CONSULTA!</h2>
        <p><strong>Empresa:</strong> ${contact.businessName}</p>
        <p><strong>RUC:</strong> ${contact.ruc || 'No proporcionado'}</p>
        <p><strong>Teléfono:</strong> ${contact.phone || 'No proporcionado'}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${contact.message}</p>
        <p><em>Mensaje recibido el: ${contact.createdAt.toLocaleString()}</em></p>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

// Controlador para manejar la solicitud POST de contacto
const createContact = async (req, res) => {
  try {
    // Crear una nueva instancia del modelo Contact
    const contact = new Contact(req.body);
    
    // Validar los datos
    contact.validate();
    
    // Enviar email
    await sendEmail(contact);
    
    // Responder al cliente
    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: contact
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Controlador para probar la conexión a Gmail
const testEmailConnection = async (req, res) => {
  try {
    await transporter.verify();
    res.status(200).json({
      success: true,
      message: 'Connection to the mail server established'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error connecting to the mail server',
      error: error.message
    });
  }
};

module.exports = {
  createContact,
  testEmailConnection
};