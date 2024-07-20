<template>
    <div>
    <select v-model="selectedLocation">
        <option value="">Location</option>
        <option v-for="location in locations" :key="location">{{ location }}</option>
      </select>
      <select v-model="selectedCategory">
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
        margin-right: 10px;
        padding: 10px;
    }
</style>
  