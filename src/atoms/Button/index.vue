<script setup lang="ts">
import { computed } from 'vue';

enum ButtonType {
  Primary,
  Secondary,
  Light,
}

const props = defineProps<{
  type?: keyof typeof ButtonType;
}>();

const typeClasses = computed(() => {
  switch (props.type) {
    case 'Secondary':
      return 'bg-secondary text-white';
    case 'Light':
      return 'bg-green-light text-slate-600';
    default:
      return 'bg-primary text-white';
  }
});
</script>

<template>
  <button
    :class="`${typeClasses} hover:bg-opacity-90 active:bg-opacity-80 disabled:bg-slate-200 disabled:text-slate-400 font-semibold py-2 px-4 rounded-sm center-middle select-none`"
  >
    <slot />
  </button>
</template>
