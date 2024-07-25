<template>
    <ul tabindex="3" role="list" class="eventList">
      <EventItem v-for="event in filteredEvents" :key="event.id" :event="event" />
    </ul>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useEventStore } from '@/store/eventStore'
  import EventItem from '@/components/events/EventItem.vue';

  const eventStore = useEventStore();
  const filteredEvents = computed(() => eventStore.filteredEvents);
</script>

<style scoped lang="scss">
  .eventList {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $desktop-default-spacing;

    @media only screen and (max-width: 900px) {
      gap: $mobile-default-spacing;
    }
  }
</style>