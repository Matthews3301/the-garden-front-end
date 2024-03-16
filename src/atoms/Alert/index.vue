<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/outline';
import useAlert, { AlertType } from '@/composables/useAlert';

const { alertType, alertMessage, alertVisible, clearAlert } = useAlert();
</script>

<template>
  <transition name="fade">
    <div
      v-if="alertVisible"
      class="fixed bottom-0 left-0 right-0 text-white px-6 py-4 shadow-lg z-50"
      :class="{
        'bg-green-dark': alertType === AlertType.Success,
        'bg-red-400': alertType === AlertType.Error,
        'bg-slate-400': alertType === AlertType.Info,
      }"
    >
      <p class="text-sm text-center">{{ alertMessage }}</p>
      <button
        class="absolute top-0 bottom-0 right-0 px-4 py-3 focus:outline-none"
        @click="clearAlert"
      >
        <XMarkIcon class="h-5 w-5" />
      </button>
    </div>
  </transition>
</template>
