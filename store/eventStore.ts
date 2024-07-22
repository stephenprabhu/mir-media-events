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
  selectedCategory: string;
  selectedLocation: string;
}

export const useEventStore = defineStore('eventStore', {
  state: (): State => ({
    allEvents: [],
    selectedCategory: '',
    selectedLocation: ''
  }),
  getters: {
    filteredEvents: (state) => {
      return state.allEvents.filter(event => {
        return (!state.selectedCategory || event.category === state.selectedCategory) &&
               (!state.selectedLocation || event.location === state.selectedLocation);
      });
    }
  },
  actions: {
    setEvents(events: Event[]) {
      this.allEvents = events;
    },
    setCategory(category: string) {
      this.selectedCategory = category;
    },
    setLocation(location: string) {
      this.selectedLocation = location;
    }
  }
});
