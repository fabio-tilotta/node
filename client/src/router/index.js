import { createRouter, createWebHistory } from 'vue-router'
import ContactList from '../components/ContactList.vue'
import ContactForm from '../components/ContactForm.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ContactList
  },
  {
    path: '/contatti/nuovo',
    name: 'NewContact',
    component: ContactForm
  },
  {
    path: '/contatti/:id',
    name: 'EditContact',
    component: ContactForm
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router