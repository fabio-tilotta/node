import { api } from './api'

export const contactService = {
  getAll: () => api.get('/api/contacts'),
  getById: (id) => api.get(`/api/contacts/${id}`),
  create: (contact) => api.post('/api/contacts', contact),
  update: (id, contact) => api.put(`/api/contacts/${id}`, contact),
  delete: (id) => api.delete(`/api/contacts/${id}`)
}