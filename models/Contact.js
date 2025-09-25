const mongoose = require('mongoose');

// Schema del contatto - definisce la struttura dei dati
const contactSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Il nome è obbligatorio'], // Validazione
    trim: true // Rimuove spazi vuoti all'inizio e alla fine
  },
  cognome: {
    type: String,
    required: [true, 'Il cognome è obbligatorio'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'L\'email è obbligatoria'],
    unique: true, // Non possono esserci due contatti con la stessa email
    lowercase: true, // Converte automaticamente in minuscolo
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email non valida']
  },
  telefono: {
    type: String,
    required: [true, 'Il telefono è obbligatorio'],
    trim: true
  }
}, {
  timestamps: true // Aggiunge automaticamente createdAt e updatedAt
});

module.exports = mongoose.model('Contact', contactSchema);