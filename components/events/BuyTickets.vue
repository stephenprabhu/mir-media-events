<template>
  <button class="buybutton">
    Buy Tickets <img src="@/assets/images/shop.png" />
  </button>
</template>

<script lang="ts" setup>

</script>

<style  scoped lang="scss">
.buybutton {
    display: flex;
    align-items: center;
    justify-content: center; 
    padding: 10px 20px; 
    border: none; 
    background-color: black; 
    cursor: pointer; 
    color: white;
    font-family: $font-stack;
}

.buybutton img {
    margin-left: 0px; 
}
</style>