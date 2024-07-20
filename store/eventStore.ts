import { defineStore } from 'pinia'

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  category: string;
  description: string;
  location: string;
  price: number;
}

interface State {
    allEvents: Event[];
    filteredEvents: Event[];
    selectedCategory: string;
    selectedLocation: string;
}

export const useEventStore = defineStore('eventStore', {
    state: (): State => ({
      allEvents: [],
      filteredEvents: [],
      selectedCategory: '',
      selectedLocation: ''
    }),
    actions: {
      setEvents(events: Event[]) {
        this.allEvents = events
        this.filteredEvents = events
      },
      filterEvents() {
        this.filteredEvents = this.allEvents.filter(event => {
          return (
            (this.selectedCategory === '' || event.category === this.selectedCategory) &&
            (this.selectedLocation === '' || event.location === this.selectedLocation)
          )
        })
      },
      setCategory(category: string) {
        this.selectedCategory = category
        this.filterEvents()
      },
      setLocation(location: string) {
        this.selectedLocation = location
        this.filterEvents()
      }
    },
  })