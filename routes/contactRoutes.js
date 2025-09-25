// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Definiamo tutte le route per i contatti

// GET /api/contacts - Ottiene tutti i contatti
router.get('/', contactController.getAllContacts);

// GET /api/contacts/:id - Ottiene un contatto specifico
router.get('/:id', contactController.getContactById);

// POST /api/contacts - Crea un nuovo contatto
router.post('/', contactController.createContact);

// PUT /api/contacts/:id - Aggiorna un contatto esistente
router.put('/:id', contactController.updateContact);

// DELETE /api/contacts/:id - Elimina un contatto
router.delete('/:id', contactController.deleteContact);

module.exports = router;