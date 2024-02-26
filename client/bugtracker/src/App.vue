<script setup lang="ts">
import SideBar from './components/SideBar.vue';



</script>

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" /> -->
  </header>

  <main>
    <SideBar></SideBar>

    <router-view></router-view>
  </main>
</template>

<style scoped></style>
