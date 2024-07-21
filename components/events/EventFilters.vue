<template>
  <div class="filterSection">
    <label for="location-dropdown" class="sr-only">Location</label>
    <CustomDropdown
      id="location-dropdown"
      :options="locationOptions"
      v-model="selectedLocation"
      placeholder="Location"
      :tabindex="1"
    />

    <label for="category-dropdown" class="sr-only">Category</label>
    <CustomDropdown
      id="category-dropdown"
      :options="categoryOptions"
      v-model="selectedCategory"
      placeholder="Category"
      :tabindex="2"
    />
  </div>
</template>
  
<script setup>
  import { ref, computed, watch } from 'vue';
  import CustomDropdown from '@/components/general/CustomDropdown.vue';
  import { useEventStore } from '@/store/eventStore';
  
  const eventStore = useEventStore();
  
  //add category options from events
  const categoryOptions = computed(() => {
    const allCategories = eventStore.allEvents.map(event => ({
      value: event.category,
      label: event.category
    }));
    const uniqueCategories = [...new Set(allCategories.map(option => JSON.stringify(option)))].map(option => JSON.parse(option));
    return [{ value: '', label: 'Category' }, ...uniqueCategories];
  });
  
  //add location options from events
  const locationOptions = computed(() => {
    const allLocations = eventStore.allEvents.map(event => ({
      value: event.location,
      label: event.location
    }));
    const uniqueLocations = [...new Set(allLocations.map(option => JSON.stringify(option)))].map(option => JSON.parse(option));
    return [{ value: '', label: 'Location' }, ...uniqueLocations];
  });

  const selectedCategory = ref('');
  const selectedLocation = ref('');
  watch(selectedCategory, (newCategory) => {
    eventStore.setCategory(newCategory);
  });
  
  watch(selectedLocation, (newLocation) => {
    eventStore.setLocation(newLocation);
  });
</script>
  
<style scoped lang="scss">
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

  .filterSection {
    display: flex;
    gap: 1.5em;
  }
</style>
  