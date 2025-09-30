<template>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <div class="contact-list">
    <div class="header-actions">
      <h2>Lista Contatti</h2>
      <div class="action-buttons">
        <button @click="showCreateModal = true" class="btn btn-create">
          Nuovo contatto
        </button>
      </div>
    </div>

    <!-- Tabella Contatti -->
    <div class="table-container">
      <table v-if="contacts.length">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Cognome</th>
            <th>Email</th>
            <th>Telefono</th>
            <th class="actions-header">Azioni</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="contact in contacts" :key="contact._id">
            <td>{{ contact.nome }}</td>
            <td>{{ contact.cognome }}</td>
            <td>{{ contact.email }}</td>
            <td>{{ contact.telefono }}</td>
            <td class="actions-cell">
              <button @click="editContact(contact)" class="btn-icon btn-edit" title="Modifica contatto">
                <span class="material-icons">edit</span>
              </button>
              <button @click="confirmDelete(contact)" class="btn-icon btn-delete" title="Elimina contatto">
                <span class="material-icons">delete</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else class="no-data">Nessun contatto trovato</p>
    </div>

    <!-- Modal per la creazione/modifica -->
    <Modal 
      :show="showCreateModal || showEditModal"
      :title="modalTitle"
      :isEdit="showEditModal"
      @close="closeModal"
      @confirm="saveContact"
    >
      <ContactForm 
        ref="contactForm"
        :contact="selectedContact"
        :isEdit="showEditModal"
      />
    </Modal>

    <!-- Modal per la conferma eliminazione -->
    <Modal
      :show="showDeleteModal"
      title="Conferma Eliminazione"
      @close="closeDeleteModal"
      @confirm="deleteContact"
    >
      <p>Sei sicuro di voler eliminare questo contatto?</p>
    </Modal>
  </div>

  <footer class="app-footer">
    <p>Questo non è AUTOTORINO &copy;</p>
  </footer>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { contactService } from '../services/contactService'
import Modal from './Modal.vue'
import ContactForm from './ContactForm.vue'

export default {
  name: 'ContactList',
  components: {
    Modal,
    ContactForm
  },
  setup() {
    const contacts = ref([])
    const showCreateModal = ref(false)
    const showEditModal = ref(false)
    const showDeleteModal = ref(false)
    const selectedContact = ref(null)
    const isLoading = ref(false)
    const contactForm = ref(null)

    const modalTitle = computed(() => {
      return showEditModal.value ? 'Modifica Contatto' : 'Nuovo Contatto'
    })

    const loadContacts = async () => {
      isLoading.value = true
      try {
        const response = await contactService.getAll()
        contacts.value = response.data.data
      } catch (error) {
        console.error('Errore nel caricamento dei contatti:', error)
      } finally {
        isLoading.value = false
      }
    }

    const editContact = (contact) => {
      selectedContact.value = { ...contact }
      showEditModal.value = true
    }

    const confirmDelete = (contact) => {
      selectedContact.value = contact
      showDeleteModal.value = true
    }

    const deleteContact = async () => {
      try {
        await contactService.delete(selectedContact.value._id)
        await loadContacts()
        closeDeleteModal()
      } catch (error) {
        console.error('Errore nell\'eliminazione del contatto:', error)
      }
    }

    const saveContact = async () => {
      if (!contactForm.value || !contactForm.value.formData) return
      
      try {
        const data = contactForm.value.formData
        if (showEditModal.value) {
          await contactService.update(selectedContact.value._id, data)
        } else {
          await contactService.create(data)
        }
        await loadContacts()
        closeModal()
      } catch (error) {
        console.error('Errore nel salvare il contatto:', error)
      }
    }

    const closeModal = () => {
      showCreateModal.value = false
      showEditModal.value = false
      selectedContact.value = null
      if (contactForm.value && contactForm.value.resetForm) {
        contactForm.value.resetForm()
      }
    }

    const closeDeleteModal = () => {
      showDeleteModal.value = false
      selectedContact.value = null
    }

    onMounted(loadContacts)

    return {
      contacts,
      showCreateModal,
      showEditModal,
      showDeleteModal,
      selectedContact,
      isLoading,
      modalTitle,
      contactForm,
      editContact,
      confirmDelete,
      deleteContact,
      saveContact,
      closeModal,
      closeDeleteModal
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

.contact-list {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Roboto', sans-serif;
}

.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 16px 0;
  border-bottom: 1px solid rgba(0,0,0,0.08);
}

.header-actions h2 {
  font-size: 1.25rem;
  font-weight: 400;
  color: #546E7A;
  margin: 0;
  letter-spacing: 0.5px;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.table-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  margin: 20px 0;
  padding: 8px;
}

.table-container:hover {
  box-shadow: 0 8px 12px rgba(0,0,0,0.12), 0 3px 6px rgba(0,0,0,0.08);
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  table-layout: fixed;
}

th:not(.actions-header) {
  width: auto;
}

th, td {
  padding: 20px;
  text-align: left;
  border-bottom: 1px solid rgba(0,0,0,0.06);
  font-size: 0.875rem;
}

tr:hover td {
  background-color: rgba(0,0,0,0.02);
}

th {
  background-color: #f5f5f5;
  font-weight: 500;
  color: rgba(0,0,0,0.87);
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.5px;
}

.actions-header {
  text-align: center;
  width: 120px;
}

.actions-cell {
  display: flex;
  gap: 8px;
  justify-content: center;
  width: 120px;
  padding: 8px 0;
}

.btn-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  background-color: #f5f5f5;
  color: rgba(0,0,0,0.87);
}

.btn-icon:hover {
  transform: translateY(-1px);
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}

.btn-icon .material-icons {
  font-size: 20px;
}

.btn-icon.btn-edit {
  background-color: #E3F2FD;
  color: #1976D2;
}

.btn-icon.btn-edit:hover {
  background-color: #1976D2;
  color: white;
}

.btn-icon.btn-delete {
  background-color: #FFEBEE;
  color: #D32F2F;
}

.btn-icon.btn-delete:hover {
  background-color: #D32F2F;
  color: white;
}

.btn {
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06);
  text-transform: capitalize;
  font-size: 0.875rem;
  letter-spacing: 0.3px;
}

.btn:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08);
  transform: translateY(-1px);
}

.btn-create {
  background-color: #4CAF50;
  color: white;
}

.btn-edit {
  background-color: #2196F3;
  color: white;
}

.btn-delete {
  background-color: #f44336;
  color: white;
}

.btn:hover {
  opacity: 0.9;
}

.no-data {
  text-align: center;
  padding: 20px;
  color: #666;
}

.app-footer {
  background-color: #f5f5f5;
  padding: 12px;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid rgba(0,0,0,0.08);
  z-index: 100;
}

.app-footer p {
  color: #757575;
  margin: 0;
  font-size: 0.8rem;
  font-weight: 400;
  letter-spacing: 0.3px;
  text-shadow: 0 1px 1px rgba(255,255,255,0.8);
  font-family: 'Roboto', sans-serif;
  line-height: 1;
}

/* Aggiungiamo padding al fondo del contenuto principale per evitare che il footer fisso lo copra */
.contact-list {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Roboto', sans-serif;
  padding-bottom: 60px; /* Spazio per il footer */
}

@media (max-width: 768px) {
  .header-actions {
    flex-direction: column;
    gap: 15px;
  }

  .action-buttons {
    width: 100%;
    justify-content: stretch;
  }

  .btn {
    flex: 1;
  }

  table {
    display: block;
    overflow-x: auto;
  }
}
</style>