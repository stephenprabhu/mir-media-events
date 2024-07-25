<template>
  <div class="dropdown" :class="{ open: isOpen }">
    <button
      class="dropdown-toggle"
      @click="toggleDropdown"
      @keydown.enter.prevent="toggleDropdown"
      @keydown.space.prevent="toggleDropdown"
      @keydown.down.prevent="focusFirstOption"
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
      @keydown.down.prevent="focusNextOption"
      @keydown.up.prevent="focusPreviousOption"
      @keydown.enter.prevent="selectOption"
      @keydown.esc.prevent="closeDropdown"
    >
      <li
        v-for="(option, index) in options"
        :key="option.value"
        :id="`${dropdownId}-option-${index}`"
        :tabindex="0"
        role="option"
        :aria-selected="isSelected(option)"
        @click="selectOption(option)"
        @keydown.enter.prevent="selectOption(option)"
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
  const selectedLabel = computed(() => {
    const selectedOption = props.options.find(option => option.value === selectedValue.value);
    return selectedOption ? selectedOption.label : props.placeholder;
  });

  const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
  };

  const closeDropdown = () => {
    isOpen.value = false;
  };

  const selectOption = (option) => {
    selectedValue.value = option.value;
    emit('update:modelValue', option.value);
    closeDropdown();
  };

  const isSelected = (option) => {
    return option.value === selectedValue.value;
  };

  const focusFirstOption = (event) => {
    const firstOption = event.currentTarget.nextElementSibling?.querySelector('li');
    if (firstOption) firstOption.focus();
  };

  const focusNextOption = (event) => {
    const currentOption = event.target;
    const nextOption = currentOption.nextElementSibling;
    if (nextOption) nextOption.focus();
  };

  const focusPreviousOption = (event) => {
    const currentOption = event.target;
    const previousOption = currentOption.previousElementSibling;
    if (previousOption) previousOption.focus();
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
        font-size: 12px;
      }

      &:focus {
        outline: none;
        background-color: $primary-color;
        color: $text-color-secondary;
      }

      &[aria-selected='true'] {
        background-color: $primary-color;
        color: $text-color-secondary;
      }
    }
  }
</style>
