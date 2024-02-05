import { defineStore } from 'pinia'

export const useWidgetsStore = defineStore('widgets', {
  state: () => ({
    showModal: false,
  }),
  actions: {
    openModal() {
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    },
  },
})
