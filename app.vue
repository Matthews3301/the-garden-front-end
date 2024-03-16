<script setup lang="ts">
import '@/assets/css/tailwind.css'


</script>

<template>
  <div class="bg-green-light" tabindex="0">
    <NuxtPage />
  </div>
</template>

<style>
.fade-enter-active {
  transition: opacity 0.2s ease;
}
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>