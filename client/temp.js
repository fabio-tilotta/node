//temp
const handleSave = async () => {
  if (!this.$refs.contactForm) return
  
  this.isSubmitting = true
  try {
    const formData = this.$refs.contactForm.form
    if (this.showEditModal) {
      await this.contactService.update(this.selectedContact._id, formData)
    } else {
      await this.contactService.create(formData)
    }
    await this.loadContacts()
    this.closeModal()
  } catch (error) {
    console.error('Errore durante il salvataggio:', error)
  } finally {
    this.isSubmitting = false
  }
}