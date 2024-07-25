<template>
  <div class="container">
    <div class="header-section">
      <h1>Program and tickets</h1>
      <EventFilters />
    </div>
    <EventList />
  </div>
</template>

<script setup>
  import EventList from '@/components/events/EventList.vue';
  import EventFilters from '@/components/events/EventFilters.vue'
  import { useEventStore } from '@/store/eventStore'

  //fetch events from api & add to store
  const runtimeConfig = useRuntimeConfig()
  const eventStore = useEventStore()
  const { data, error } = await useAsyncData('events', () =>
    fetch(`${runtimeConfig.public.apiBase}/api/events`).then(res => res.json())
  )
  if (error.value) {
    console.error('Error fetching events:', error.value)
  }
  if (data.value && data.value.events) {
    eventStore.setEvents(data.value.events)
  }
</script>

<style scoped lang="scss">
  .container {
    padding: 1.25em;
    width: 85%;
    margin: auto;

    @media only screen and (max-width: 900px) {
        padding: 0.6em;
        width: 95%;
    }
  }
</style>
