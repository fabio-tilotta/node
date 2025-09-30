import { createRouter, createWebHistory } from 'vue-router'
import ContactList from '../components/ContactList.vue'
import ContactForm from '../components/ContactForm.vue'
import Home from '../views/Home.vue'  // ← Importa Home
import About from '../views/About.vue'  // ← Importa About

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home  // ← Ora '/' carica Home
  },
  {
    path: '/contacts',  // ← Cambiato da '/lista-contatti' a '/contacts'
    name: 'ContactList',
    component: ContactList
  },
  {
    path: '/about',
    name: 'About',
    component: About
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