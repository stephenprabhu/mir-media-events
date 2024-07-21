<template>
  <div>
    <ul>
      <li v-for="event in filteredEvents" :key="event.id" tabindex="3" role="listitem">
        <EventItem :event="event" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useEventStore } from '@/store/eventStore'
import EventItem from '@/components/events/EventItem.vue';

// Retrieve the event store
const eventStore = useEventStore()

// Access the filtered events from the store
const filteredEvents = computed(() => eventStore.filteredEvents)

</script>
<style>
li {
  
}
</style>