// app.js
const express = require('express');
const mongoose = require('mongoose');

// Importiamo i nostri moduli
const logger = require('./middleware/logger');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// Connessione a MongoDB
mongoose.connect('mongodb://localhost:27017/rubrica-contatti')
  .then(() => console.log('✅ Connesso a MongoDB'))
  .catch(err => console.error('❌ Errore connessione MongoDB:', err));

// Middleware globali
app.use(express.json()); // Per parsare il JSON nel body delle richieste
app.use(logger); // Il nostro middleware di logging personalizzato

// Routes
app.use('/api/contacts', contactRoutes); // Tutte le route dei contatti

// Route di test per verificare che il server funzioni
app.get('/', (req, res) => {
  res.json({
    message: 'API Rubrica Contatti',
    endpoints: {
      'GET /api/contacts': 'Ottiene tutti i contatti',
      'GET /api/contacts/:id': 'Ottiene un contatto specifico',
      'POST /api/contacts': 'Crea un nuovo contatto',
      'PUT /api/contacts/:id': 'Aggiorna un contatto',
      'DELETE /api/contacts/:id': 'Elimina un contatto'
    }
  });
});

// Middleware per gestire route non trovate
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint non trovato'
  });
});

// Middleware per gestire errori globali
app.use((err, req, res, next) => {
  console.error('Errore:', err);
  res.status(500).json({
    success: false,
    message: 'Errore interno del server'
  });
});

module.exports = app;