const contactService = require('../services/contactService');

class ContactController {

  // GET /api/contacts - Ottiene tutti i contatti
  async getAllContacts(req, res) {
    try {
      const contacts = await contactService.getAllContacts();
      res.status(200).json({
        success: true,
        data: contacts,
        message: `Trovati ${contacts.length} contatti`
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // GET /api/contacts/:id - Ottiene un contatto specifico
  async getContactById(req, res) {
    try {
      const { id } = req.params; // Estraiamo l'ID dai parametri dell'URL
      const contact = await contactService.getContactById(id);
      
      res.status(200).json({
        success: true,
        data: contact,
        message: 'Contatto trovato'
      });
    } catch (error) {
      // Se l'errore è "non trovato", restituiamo 404, altrimenti 500
      const statusCode = error.message.includes('non trovato') ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        message: error.message
      });
    }
  }

  // POST /api/contacts - Crea un nuovo contatto
  async createContact(req, res) {
    try {
      const contactData = req.body; // I dati arrivano dal body della richiesta
      const newContact = await contactService.createContact(contactData);
      
      res.status(201).json({ // 201 = Created
        success: true,
        data: newContact,
        message: 'Contatto creato con successo'
      });
    } catch (error) {
      // Se l'errore è di validazione o email duplicata, restituiamo 400
      const statusCode = error.message.includes('già esistente') || 
                         error.message.includes('obbligatorio') ? 400 : 500;
      res.status(statusCode).json({
        success: false,
        message: error.message
      });
    }
  }

  // PUT /api/contacts/:id - Aggiorna un contatto
  async updateContact(req, res) {
    try {
      const { id } = req.params;
      const contactData = req.body;
      
      const updatedContact = await contactService.updateContact(id, contactData);
      
      res.status(200).json({
        success: true,
        data: updatedContact,
        message: 'Contatto aggiornato con successo'
      });
    } catch (error) {
      const statusCode = error.message.includes('non trovato') ? 404 : 
                         error.message.includes('già esistente') ? 400 : 500;
      res.status(statusCode).json({
        success: false,
        message: error.message
      });
    }
  }

  // DELETE /api/contacts/:id - Elimina un contatto
  async deleteContact(req, res) {
    try {
      const { id } = req.params;
      const deletedContact = await contactService.deleteContact(id);
      
      res.status(200).json({
        success: true,
        data: deletedContact,
        message: 'Contatto eliminato con successo'
      });
    } catch (error) {
      const statusCode = error.message.includes('non trovato') ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new ContactController();