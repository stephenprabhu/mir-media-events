import { mount } from '@vue/test-utils'
import EventFilters from '@/components/events/EventFilters.vue'
import { createTestingPinia } from '@pinia/testing';
import { useEventStore } from '@/store/eventStore';
import { describe, it, expect, beforeEach } from 'vitest';

interface Event {
  id: number;
  category: string;
  location: string;
  title: string;
  description: string;
  date: string;
  time: string;
  price: number;
}

describe('EventFilters', () => {
  const pinia = createTestingPinia({ stubActions: false });
  const eventStore = useEventStore(pinia);

  beforeEach(() => {        
    const events: Event[] = [
      {
          "id": 1,
          "title": "Beethoven Symphonie Nr. 9",
          "date": "2024-07-20",
          "time": "19:00",
          "category": "Klassik",
          "description": "Erleben Sie Beethovens Meisterwerk in einer atemberaubenden Aufführung.",
          "location": "Großer Saal",
          "price": 50.00
      },
      {
        "id": 2,
        "title": "Jazz Nacht",
        "date": "2024-07-21",
        "time": "20:00",
        "category": "Jazz",
        "description": "Eine unvergessliche Nacht mit den besten Jazzmusikern der Stadt.",
        "location": "Kleiner Saal",
        "price": 30.00
      }
    ];
    eventStore.allEvents = events;
  })

  const wrapper = mount(EventFilters)
  const locationDropdown = wrapper.findAllComponents({ name: 'CustomDropdown' })[0]
  const categoryDropdown = wrapper.findAllComponents({ name: 'CustomDropdown' })[1]

  it('renders correctly with given options', () => {
    expect(wrapper.html()).toContain('Location')
    expect(wrapper.html()).toContain('Category')

    expect(locationDropdown.props().options.length).toBe(3) 
    expect(categoryDropdown.props().options.length).toBe(3)
  })

  it('updates the store when an location is selected', async () => {
    await locationDropdown.vm.$emit('update:modelValue', 'Großer Saal')
    expect(eventStore.selectedLocation).toBe('Großer Saal')
  })

  it('updates the store when an category is selected', async () => {
    await categoryDropdown.vm.$emit('update:modelValue', 'Jazz')
    expect(eventStore.selectedCategory).toBe('Jazz')
  })
})
