<template>
  <div class="dropdown" :class="{ open: isOpen }">
    <button
      class="dropdown-toggle"
      @click="toggleDropdown"
      @keydown.enter.prevent="toggleDropdown"
      @keydown.space.prevent="toggleDropdown"
      @keydown.down.prevent="openAndFocusFirstOption"
      :aria-expanded="isOpen"
      :aria-controls="dropdownId"
      :aria-haspopup="true"
      :tabindex="tabindex"
    >
      {{ selectedLabel }}
      <img class="dropdown-icon" src="/assets/images/chevron-down.png" alt="dropdown-icon">
    </button>
    <ul
      v-if="isOpen"
      :id="dropdownId"
      class="dropdown-menu"
      role="listbox"
      ref="dropdownMenu"
      @keydown.down.prevent="focusNextOption"
      @keydown.up.prevent="focusPreviousOption"
      @keydown.enter.prevent="selectFocusedOption"
      @keydown.esc.prevent="closeDropdown"
    >
      <li
        v-for="(option, index) in options"
        :key="option.value"
        :id="`${dropdownId}-option-${index}`"
        :tabindex="-1"
        role="option"
        :aria-selected="isSelected(option)"
        @click="selectOption(option)"
        @mouseenter="focusOptionByIndex(index)"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
  modelValue: [String, Number],
  options: {
    type: Array,
    required: true,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: 'Select an option',
  },
  tabindex: {
    type: Number,
    default: 0,
  }
});

const emit = defineEmits(['update:modelValue']);
const dropdownId = `dropdown-${Math.random().toString(36).substr(2, 9)}`;

const isOpen = ref(false);
const selectedValue = ref(props.modelValue);
const focusedOptionIndex = ref(-1);
const dropdownMenu = ref(null);

const selectedLabel = computed(() => {
  const selectedOption = props.options.find(option => option.value === selectedValue.value);
  return selectedOption ? selectedOption.label : props.placeholder;
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    focusedOptionIndex.value = -1;
  }
};

const closeDropdown = () => {
  isOpen.value = false;
  focusedOptionIndex.value = -1;
};

const selectOption = (option) => {
  selectedValue.value = option.value;
  emit('update:modelValue', option.value);
  closeDropdown();
};

const isSelected = (option) => {
  return option.value === selectedValue.value;
};

const openAndFocusFirstOption = () => {
  if (!isOpen.value) {
    isOpen.value = true;
  }
  focusOptionByIndex(0);
};

const focusOptionByIndex = (index) => {
  focusedOptionIndex.value = index;
  if (dropdownMenu.value) {
    const options = dropdownMenu.value.querySelectorAll('li');
    if (options[index]) {
      options[index].focus();
    }
  }
};

const focusNextOption = () => {
  const nextIndex = (focusedOptionIndex.value + 1) % props.options.length;
  focusOptionByIndex(nextIndex);
};

const focusPreviousOption = () => {
  const previousIndex = (focusedOptionIndex.value - 1 + props.options.length) % props.options.length;
  focusOptionByIndex(previousIndex);
};

const selectFocusedOption = () => {
  if (focusedOptionIndex.value !== -1) {
    selectOption(props.options[focusedOptionIndex.value]);
  }
};

onMounted(() => {
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.dropdown')) {
      closeDropdown();
    }
  });
});
</script>

<style scoped  lang="scss">
  .dropdown {
    position: relative;
    display: inline-block;

    &.open {
        .dropdown-toggle {
          background-color: #f8f9fa;
        }
        .dropdown-menu {
          display: block;
        }
      }
  }

  .dropdown-icon {
    margin-left: 10px;
  }

  .dropdown-toggle {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    font-family: $font-stack;
    font-size: 18px;
    padding: 10px;
    background-color: #fff;
    border: none;
    border-bottom: 1px solid $primary-color;
    transition: background-color 0.3s;

    @media only screen and (max-width: 900px) {
      font-size: 12px;
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 0.5px $text-color-primary;
    }

    .dropdown-symbol {
      margin-left: 8px;
    }
  }

  .dropdown-menu {
    display: none;
    position: absolute;
    z-index: 1000;
    min-width: 160px;
    padding: 5px 0;
    margin: 2px 0 0;
    font-size: 14px;
    text-align: left;
    list-style: none;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);

    li {
      padding: 10px;
      cursor: pointer;
      font-size: 18px;

      @media only screen and (max-width: 900px) {
        font-size: 14px;
      }

      &:focus {
        border: 1px solid $primary-color;
      }

      &[aria-selected='true'] {
        background-color: $primary-color;
        color: $text-color-secondary;
      }
    }
  }
</style>
