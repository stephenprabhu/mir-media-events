<template>
    <div>
    <label for="location-select" class="sr-only">Location</label>
    <select v-model="selectedLocation" id="location-select" aria-label="Location" tabindex="1">
        <option value="">Location</option>
        <option v-for="location in locations" :key="location">{{ location }}</option>
      </select>
      <label for="category-select" class="sr-only">Category</label>
      <select id="category-select" v-model="selectedCategory" aria-label="Category" tabindex="2">
        <option value="">Category</option>
        <option v-for="category in categories" :key="category">{{ category }}</option>
      </select>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue'
  import { useEventStore } from '@/store/eventStore'
  
  // Retrieve the event store
  const eventStore = useEventStore()
  
  // Reactive variables for selected filters
  const selectedCategory = ref('')
  const selectedLocation = ref('')
  
  // Compute unique categories and locations from events
  const categories = computed(() => {
    const allCategories = eventStore.allEvents.map(event => event.category)
    return [...new Set(allCategories)]
  })
  
  const locations = computed(() => {
    const allLocations = eventStore.allEvents.map(event => event.location)
    return [...new Set(allLocations)]
  })
  
  // Watchers to update the store when selected filters change
  watch(selectedCategory, (newCategory) => {
    eventStore.setCategory(newCategory)
  })
  
  watch(selectedLocation, (newLocation) => {
    eventStore.setLocation(newLocation)
  });
  </script>
  
<style scoped lang="scss">
    select {
        border: none;
        font-family: $font-stack;
        font-weight: 400;
        color: $text-color-primary;
        font-size: 0.9rem;
        border-bottom: 1px solid $primary-color;
        margin-right: 0.6em;
        padding: 0.6em;
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
    }

</style>
  