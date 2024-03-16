<script setup lang="ts">
import AccountButton from '@/components/AccountButton/index.vue';
// import UserDropdown from './UserDropdown.vue'
</script>

<template>
  <nav class="w-full bg-green-light py-4 px-6 flex items-center justify-between">
    <div class="flex">
      <span class="mt-2 ml-2">
        <NuxtLink to="/"> </NuxtLink>
      </span>
    </div>
    <AccountButton />
    <!-- <UserDropdown /> -->
  </nav>
</template>
