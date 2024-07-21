import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import EventList from '@/components/events/EventList.vue';
import { createTestingPinia } from '@pinia/testing';
import { useEventStore } from '@/store/eventStore';

// Define the Event type
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

describe('EventList.vue', () => {
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
  });

  const wrapper = mount(EventList, {
    global: {
      plugins: [pinia],
    },
  });

  it('renders a list of events', () => {
    const eventItems = wrapper.findAllComponents({ name: 'EventItem' });
    expect(eventItems.length).toBe(2);
  });

  it('renders a list of events filtered by category', async () => {
    eventStore.setCategory('Jazz');
    await wrapper.vm.$nextTick(); 
    const eventItems = wrapper.findAllComponents({ name: 'EventItem' });
    expect(eventItems.length).toBe(1); 
  });

  it('renders a list of events filtered by location', async () => {
    eventStore.setLocation('Kleiner Saal');
    await wrapper.vm.$nextTick();
    const eventItems = wrapper.findAllComponents({ name: 'EventItem' });
    expect(eventItems.length).toBe(1);
  });
});
