import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import EventFilters from '@/components/events/EventFilters.vue';
import { createTestingPinia } from '@pinia/testing';
import { useEventStore } from '@/store/eventStore';

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
  

describe('EventFilters.vue', () => {
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
          },
    ];
    eventStore.allEvents = events;
  });

  const wrapper = mount(EventFilters, {
    global: {
      plugins: [pinia],
    },
  });
  const categorySelect = wrapper.find('#category-select');
  const locationSelect = wrapper.find('#location-select');

  it('renders categories and locations', () => {
    const categoryOptions = categorySelect.findAll('option').filter(option => option.element.innerHTML === 'Klassik' || option.element.innerHTML === 'Jazz');
    const locationOptions = locationSelect.findAll('option').filter(option => option.element.innerHTML === 'Großer Saal' || option.element.innerHTML === 'Kleiner Saal');

    expect(categoryOptions.length).toBe(2);
    expect(locationOptions.length).toBe(2);
  });

  it('updates selectedCategory when a category is selected', async () => {
    await categorySelect.setValue('Jazz');
    expect(eventStore.selectedCategory).toBe('Jazz');
  });

  it('updates selectedLocation when a location is selected', async () => {
    await locationSelect.setValue('Großer Saal');
    expect(eventStore.selectedLocation).toBe('Großer Saal');
  });
});
