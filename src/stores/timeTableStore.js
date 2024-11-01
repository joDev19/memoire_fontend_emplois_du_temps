import { defineStore } from "pinia"
export const useTableTimeStore = defineStore('tableTime', {
  state: () => ({
    events: [],
    event: {},
    modalIsOpen: false,
    currentStep: 'classe',
    data: {
      filieres_id: [],
    },
    isUpdateEvent: false,
    isShowingCalendar: false,
    dataToShow: null,
    eventInCopy: false,
    startDateOfTheWeek: "",
  }),

  actions: {
    removeEvent(id) {
      this.events = this.events.filter(event => event.id != id)
    },

    addEvent(event) {
      this.events.push(event)
    },

    resetEvent() {
      if (!this.isUpdateEvent)
        this.event = {}
    },

    resetEventFiliere() {
      if (!this.isUpdateEvent)
        this.event.filieres = []
    }
  },
})