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
    justify-content: center; /* This centers the content horizontally */
    padding: 10px 20px; /* Optional: Add padding for better appearance */
    border: none; /* Optional: Remove border */
    background-color: black; /* Optional: Add background color */
    cursor: pointer; /* Optional: Change cursor to pointer on hover */
    color: white;
    font-family: $font-stack;
}

.buybutton img {
    margin-left: 0px; /* Add space between the text and the image */
}
</style>