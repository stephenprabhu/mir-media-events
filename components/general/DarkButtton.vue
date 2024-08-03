<template>
  <button class="darkbutton" :aria-label="label">
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
  const {label} = defineProps(['label'])

</script>

<style scoped lang="scss">
  .darkbutton {
        @include dark-box;
        display: flex;
        align-items: center;
        justify-content: center; 
        padding: 16px 20px; 
        border: none; 
        cursor: pointer; 
        font-size: 18px;
        font-family: $font-stack;
        font-weight: 400;
        line-height: 120%; 

    @media only screen and (max-width: 900px) {
        padding: 8px 16px; 
    }
    .img {
      margin-left: 0; 
    }
  }
</style>