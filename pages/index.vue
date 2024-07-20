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
    padding: 20px;
}
.header-section {
  padding-left: 10px;
}

@media only screen and (max-width: 900px) {
  .container {
    padding: 15px;
  }
}
</style>
