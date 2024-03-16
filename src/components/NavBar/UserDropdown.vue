<script setup lang="ts">
import { UserCircleIcon } from '@heroicons/vue/24/outline';
</script>

<template>
  <div class="dropdown dropdown-end">
    <div tabindex="0" role="button" class="m-1">
      <UserCircleIcon class="h-6 text-secondary hover:text-slate-600 active:text-slate-500" />
    </div>
    <ul
      tabindex="0"
      class="dropdown-content z-[1] menu p-2 shadow rounded-sm bg-base-100 w-32 cursor-pointer hover:bg-slate-100 active:bg-slate-200"
    >
      <li class="ml-2">Sign out</li>
    </ul>
  </div>
  <!-- <UserCircleIcon class="h-8 text-secondary mr-2" /> -->
</template>
