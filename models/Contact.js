// models/Contact.js
class Contact {
    constructor({ businessName, ruc, phone, email, message }) {
      this.businessName = businessName;
      this.ruc = ruc;
      this.phone = phone;
      this.email = email;
      this.message = message;
      this.createdAt = new Date();
    }
  
    validate() {
      if (!this.businessName || !this.email || !this.message) {
        throw new Error('Los campos Nombre de Empresa, Email y Mensaje son obligatorios');
      }
      
      // Validación básica de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        throw new Error('El formato del email es inválido');
      }
      
      return true;
    }
  }
  
  module.exports = Contact;