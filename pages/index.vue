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
import EventList from '~/components/events/EventList.vue';
import EventFilters from '~/components/events/EventFilters.vue'
</script>

<style scoped lang="scss">
.container {
    padding: 1.25em;
    width: 80%;
    margin: auto;

    @media only screen and (max-width: 900px) {
        padding: 0.6em;
    }
}

</style>
