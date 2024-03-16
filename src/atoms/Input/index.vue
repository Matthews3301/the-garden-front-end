<script setup lang="ts">
defineProps<{
  placeholder: string;
  modelValue: string;
  autofocus: boolean;
  name?: string;
  type?: string;
  autocomplete?: string;
}>();

defineEmits(['update:modelValue']);
</script>

<template>
  <input
    :type="type || 'text'"
    :name="type || `input-${Math.random()}`"
    class="border border-cream-dark border-1 px-3 py-2 rounded-md focus:outline-none focus:border-secondary"
    :placeholder="placeholder"
    :value="modelValue"
    :autofocus="autofocus"
    :autocomplete="autocomplete"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>
