<template>
  <button class="buybutton" aria-label="Buy Tickets">
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>

</script>

<style scoped lang="scss">
  .buybutton {
        @include dark-box;
        display: flex;
        align-items: center;
        justify-content: center; 
        padding: 16px 20px; 
        border: none; 
        cursor: pointer; 
        font-size: 14px;
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