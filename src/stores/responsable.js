import { defineStore } from "pinia"
export const useResponsableStore = defineStore('responsable', {
    state: () => ({ modalIsOpen: false, filiereId: 0, yearId: 0 }),
    actions: {
      
    },
  })