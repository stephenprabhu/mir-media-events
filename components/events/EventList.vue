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
  import { computed } from 'vue'
  import { useEventStore } from '@/store/eventStore'
  import EventItem from '@/components/events/EventItem.vue';

  const eventStore = useEventStore();
  const filteredEvents = computed(() => eventStore.filteredEvents);
</script>