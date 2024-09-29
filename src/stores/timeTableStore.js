import { defineStore } from "pinia"
export const useTableTimeStore = defineStore('tableTime', {
  state: () => ({
    events: [
      // { // this object will be "parsed" into an Event Object
      //   id: '1',
      //   title: 1, // a property!
      //   start: new Date('2024-09-17T08:00'), // a property!
      //   end: new Date('2024-09-17T12:00'), // a property! ** see important note below about 'end' **
      //   backgroundColor: "yellow",
      //   prof: "E. ASSOGBA",
      //   salle: 1,
      //   filieres: [1, 2],
      //   textColor: "black",
      //   masseHoraire: "/25h",
      //   editable: true,
      // },
    ],
    event: {
    },
    modalIsOpen: false,
    currentStep: 'classe',
    data: {
      filieres_id: [],
    },
    isUpdateEvent: false,
  }),
  actions: {
    removeEvent(id) {
      this.events = this.events.filter(event => event.id != id)
    },
    addEvent(event) {
      this.events.push(event)
    },
    resetEvent(){
      if(!this.isUpdateEvent)
        this.event = {}
    },
    resetEventFiliere(){
      if(!this.isUpdateEvent)
        this.event.filieres = []
    }
  },
})