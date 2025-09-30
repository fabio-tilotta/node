// services/contactService.js
const Contact = require('../models/Contact');

class ContactService {
  
  async getAllContacts() {
    try {
      const contacts = await Contact.find().sort({ cognome: 1, nome: 1 }); // Ordina per cognome e nome
      return contacts;
    } catch (error) {
      throw new Error('Errore nel recupero dei contatti: ' + error.message);
    }
  }

  async getContactById(id) {
    try {
      const contact = await Contact.findById(id);
      if (!contact) {
        throw new Error('Contatto non trovato');
      }
      return contact;
    } catch (error) {
      throw new Error('Errore nel recupero del contatto: ' + error.message);
    }
  }
    // Create
  async createContact(contactData) {
    try {
      const newContact = new Contact(contactData);
      const savedContact = await newContact.save();
      return savedContact;
    } catch (error) {
      // Se è un errore di duplicato email
      if (error.code === 11000) {
        throw new Error('Email già esistente');
      }
      throw new Error('Errore nella creazione del contatto: ' + error.message);
    }
  }

  // Update
  async updateContact(id, contactData) {
    try {
      const updatedContact = await Contact.findByIdAndUpdate(
        id, 
        contactData, 
        { 
          new: true, // Restituisce il documento aggiornato
          runValidators: true // Esegue le validazioni del schema
        }
      );
      
      if (!updatedContact) {
        throw new Error('Contatto non trovato');
      }
      
      return updatedContact;
    } catch (error) {
      if (error.code === 11000) {
        throw new Error('Email già esistente');
      }
      throw new Error('Errore nell\'aggiornamento del contatto: ' + error.message);
    }
  }

  // Delete
  async deleteContact(id) {
    try {
      const deletedContact = await Contact.findByIdAndDelete(id);
      if (!deletedContact) {
        throw new Error('Contatto non trovato');
      }
      return deletedContact;
    } catch (error) {
      throw new Error('Errore nell\'eliminazione del contatto: ' + error.message);
    }
  }
}

module.exports = new ContactService();