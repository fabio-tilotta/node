<template>
  <div class="contact-form">
    <div class="form-content">
      <div class="form-group">
        <label for="nome">Nome</label>
        <input 
          id="nome" 
          v-model="form.nome" 
          type="text" 
          required
          :class="{ 'error': errors.nome }"
          @input="validateField('nome')"
          placeholder="Mario"
        >
        <span class="helper-text" v-if="!isEdit">Inserisci il nome della persona</span>
        <span class="error-message" v-if="errors.nome">{{ errors.nome }}</span>
      </div>

      <div class="form-group">
        <label for="cognome">Cognome</label>
        <input 
          id="cognome" 
          v-model="form.cognome" 
          type="text" 
          required
          :class="{ 'error': errors.cognome }"
          @input="validateField('cognome')"
          placeholder="Rossi"
        >
        <span class="helper-text" v-if="!isEdit">Inserisci il cognome della persona</span>
        <span class="error-message" v-if="errors.cognome">{{ errors.cognome }}</span>
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input 
          id="email" 
          v-model="form.email" 
          type="email" 
          required
          :class="{ 'error': errors.email }"
          @input="validateField('email')"
          placeholder="esempio@email.com"
        >
        <span class="helper-text" v-if="!isEdit">Inserisci un indirizzo email valido</span>
        <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
      </div>

      <div class="form-group">
        <label for="telefono">Telefono</label>
        <input 
          id="telefono" 
          v-model="form.telefono" 
          type="tel" 
          required
          :class="{ 'error': errors.telefono }"
          @input="validateField('telefono')"
          placeholder="+39 XXX XXXXXXX"
        >
        <span class="helper-text" v-if="!isEdit">Inserisci un numero di telefono valido (es. +39 123 4567890)</span>
        <span class="error-message" v-if="errors.telefono">{{ errors.telefono }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watchEffect } from 'vue'

export default {
  name: 'ContactForm',
  props: {
    contact: {
      type: Object,
      default: () => ({})
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  emits: ['validation-change'],
  setup(props, { emit }) {
    const form = ref({
      nome: '',
      cognome: '',
      email: '',
      telefono: ''
    })

    const errors = ref({})
    const isSubmitting = ref(false)

    // Popola il form quando viene passato un contatto per la modifica
    watchEffect(() => {
      if (props.contact) {
        form.value = { ...props.contact }
      }
    })

    const validateField = (field) => {
      errors.value[field] = ''
      
      switch (field) {
        case 'nome':
          if (!form.value.nome.trim()) {
            errors.value.nome = 'Il nome è obbligatorio'
          }
          break
        case 'cognome':
          if (!form.value.cognome.trim()) {
            errors.value.cognome = 'Il cognome è obbligatorio'
          }
          break
        case 'email':
          if (!form.value.email.trim()) {
            errors.value.email = 'L\'email è obbligatoria'
          } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(form.value.email)) {
            errors.value.email = 'Email non valida'
          }
          break
        case 'telefono':
          if (!form.value.telefono.trim()) {
            errors.value.telefono = 'Il telefono è obbligatorio'
          }
          break
      }
    }

    const validateForm = () => {
      ['nome', 'cognome', 'email', 'telefono'].forEach(validateField)
      return Object.keys(errors.value).length === 0
    }

    const isValid = computed(() => {
      return form.value.nome.trim() &&
             form.value.cognome.trim() &&
             form.value.email.trim() &&
             form.value.telefono.trim() &&
             Object.keys(errors.value).length === 0
    })

    const getFormData = () => {
      return {
        nome: form.value.nome,
        cognome: form.value.cognome,
        email: form.value.email,
        telefono: form.value.telefono
      }
    }

    const handleSubmit = async () => {
      if (!validateForm()) return

      isSubmitting.value = true
      try {
        emit('save', { ...form.value })
      } catch (error) {
        console.error('Errore nel salvataggio del contatto:', error)
      } finally {
        isSubmitting.value = false
      }
    }

    const resetForm = () => {
      form.value = {
        nome: '',
        cognome: '',
        email: '',
        telefono: ''
      }
      errors.value = {}
    }

    return {
      form,
      errors,
      isValid,
      isSubmitting,
      validateField,
      handleSubmit,
      resetForm,
      // Esponiamo i dati del form come proprietà calcolata
      formData: computed(() => ({
        nome: form.value.nome,
        cognome: form.value.cognome,
        email: form.value.email,
        telefono: form.value.telefono
      }))
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

.contact-form {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Roboto', sans-serif;
}

.form-group {
  margin-bottom: 24px;
  position: relative;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: rgba(0,0,0,0.87);
  font-size: 0.875rem;
  letter-spacing: 0.25px;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid rgba(0,0,0,0.12);
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  background-color: #fff;
}

input:hover {
  border-color: rgba(0,0,0,0.24);
}

input:focus {
  outline: none;
  border-color: #2196F3;
  box-shadow: 0 0 0 2px rgba(33,150,243,0.1);
}

input.error {
  border-color: #f44336;
  background-color: rgba(244,67,54,0.02);
}

.error-message {
  color: #f44336;
  font-size: 0.75rem;
  margin-top: 6px;
  display: block;
}

.helper-text {
  color: rgba(0,0,0,0.6);
  font-size: 0.75rem;
  margin-top: 6px;
  display: block;
  font-style: italic;
}

.form-actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.btn-save, .btn-cancel {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
}

.btn-save {
  background-color: #2196F3;
  color: white;
  border: none;
}

.btn-confirm {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-cancel {
  background-color: #f44336;
  color: white;
}
</style>