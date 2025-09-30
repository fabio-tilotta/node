<template>
  <Teleport to="body">
    <div v-if="show" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <h3>{{ title }}</h3>
          <button class="close-button" @click="$emit('close')">&times;</button>
        </div>
        <div class="modal-content">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button 
            class="btn-confirm"
            :class="{ 'edit': isEdit }"
            @click="$emit('confirm')" 
            :disabled="!isValid"
          >
            {{ isEdit ? 'Salva' : 'Conferma' }}
          </button>
          <button class="btn-cancel" @click="$emit('close')">Annulla</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
import { Teleport } from 'vue'

export default {
  name: 'Modal',
  components: {
    Teleport
  },
  props: {
    show: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    isValid: {
      type: Boolean,
      default: true
    },
    isSubmitting: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close', 'confirm']
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
}

.modal-container {
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 8px 16px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.1);
  font-family: 'Roboto', sans-serif;
  animation: modal-appear 0.3s ease-out;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(0,0,0,0.08);
}

.modal-header h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 500;
  color: rgba(0,0,0,0.87);
  letter-spacing: 0.25px;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: rgba(0,0,0,0.54);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.close-button:hover {
  background-color: rgba(0,0,0,0.04);
  color: rgba(0,0,0,0.87);
}

@keyframes modal-appear {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-footer {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn-cancel, .btn-confirm {
  padding: 10px 20px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-cancel {
  background-color: #f44336;
  color: white;
}

.btn-cancel:hover {
  background-color: #d32f2f;
}

.btn-confirm {
  background-color: #4CAF50;
  color: white;
}

.btn-confirm:hover {
  background-color: #388E3C;
}

.btn-confirm:disabled {
  background-color: #9E9E9E;
  cursor: not-allowed;
  opacity: 0.7;
}
</style>