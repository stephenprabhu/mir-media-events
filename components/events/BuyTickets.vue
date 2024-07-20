<template>
  <button class="buybutton" aria-label="Buy Tickets">
    Buy Tickets <img src="@/assets/images/shop.png" alt="Shop Icon" />
  </button>
</template>

<script lang="ts" setup>

</script>

<style  scoped lang="scss">
.buybutton {
    @include dark-box;
    display: flex;
    align-items: center;
    justify-content: center; 
    padding: 0.6em 1.25em; 
    border: none; 
    cursor: pointer; 
    font-family: $font-stack;

  .img {
    margin-left: 0; 
  }
}

</style>