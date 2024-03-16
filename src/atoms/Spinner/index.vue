<script setup lang="ts">
import { computed } from 'vue';

enum Size {
  sm,
  md,
  lg,
}

const props = defineProps<{
  size?: keyof typeof Size;
}>();

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-5 h-5';
    case 'lg':
      return 'w-10 h-10';
    default:
      return 'w-10 h-10';
  }
});
</script>

<template>
  <div :class="sizeClasses">
    <svg
      class="animate-spin text-cream-dark"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        d="m1,12C1,5.92,5.92,1,12,1"
        fill="none"
        stroke="currentColor"
        stroke-miterlimit="10"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>
