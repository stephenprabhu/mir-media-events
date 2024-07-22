import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import EventItem from '@/components/events/EventItem.vue';

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

describe('EventItem.vue', () => {
  it('renders event details', () => {
    const event: Event = {
        "id": 1,
        "title": "Beethoven Symphonie Nr. 9",
        "date": "2024-07-20",
        "time": "19:00",
        "category": "Klassik",
        "description": "Erleben Sie Beethovens Meisterwerk in einer atemberaubenden Aufführung.",
        "location": "Großer Saal",
        "price": 50.00
      };

    const wrapper = mount(EventItem, {
      props: { event },
    });

    expect(wrapper.find('.eventTitle').text()).toBe('Beethoven Symphonie Nr. 9');
    expect(wrapper.find('.eventLocation').text()).toBe('Großer Saal');
    expect(wrapper.find('.eventPrice').text()).toBe('50€');
    expect(wrapper.find('.eventDate').text()).toBe('Sat, 20. July 2024');
    expect(wrapper.find('.eventTime').text()).toBe('7 pm');
  });
});
