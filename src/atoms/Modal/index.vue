<script setup lang="ts">
// PROPS
defineProps<{
  modalOpen: boolean;
}>();
const emit = defineEmits(['close']);
</script>

<template>
  <dialog
    class="modal fixed inset-0 z-50 flex items-center justify-center bg-transparent"
    :class="{ 'modal-open': modalOpen }"
  >
    <div
      class="modal-backdrop fixed inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-[1px]"
      @click="emit('close')"
    ></div>
    <div
      class="modal-box relative bg-white rounded-sm shadow-lg w-[80%] max-w-[600px] p-6 z-10 overflow-y-auto"
    >
      <form method="dialog">
        <button
          class="btn btn-sm btn-circle btn-ghost absolute right-1 top-1"
          @click="emit('close')"
        >
          ✕
        </button>
      </form>
      <slot />
    </div>
  </dialog>
</template>
