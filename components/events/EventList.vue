<template>
  <div>
    <ul>
      <li v-for="event in filteredEvents" :key="event.id" tabindex="3   " role="listitem">
        <EventItem :event="event" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useEventStore } from '@/store/eventStore'
import EventItem from './EventItem.vue';

// Retrieve the event store
const eventStore = useEventStore()
const runtimeConfig = useRuntimeConfig()


// Fetch data using useAsyncData
const { data, error } = await useAsyncData('events', () =>
  fetch(`${runtimeConfig.apiBase}/api/events`).then(res => res.json())
)

if (error.value) {
  console.error('Error fetching events:', error.value)
}

if (data.value && data.value.events) {
  // Set events in Pinia store
  eventStore.setEvents(data.value.events)
}

// Access the filtered events from the store
const filteredEvents = computed(() => eventStore.filteredEvents)

</script>