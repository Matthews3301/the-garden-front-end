<script setup lang="ts">
import { ref } from 'vue';

import Button from '@/atoms/Button/';
import NewPostModal from '@/components/NewPostModal/index.vue';

const newPostModalOpen = ref(false);
</script>

<template>
  <div class="w-full bg-green-light pt-8 pb-20 px-6 text-center">
    <div class="max-w-screen-md mx-auto">
      <h1 class="text-5xl font-ven mb-6">The Garden</h1>
      <p class="text-lg mb-2 mt-8">
        A decentralised X account. Everyone can propose something to post, and if your post gets
        accepted, you can then start accepting other people's posts 🪴
      </p>
      <Button class="mx-auto mt-8" @click="newPostModalOpen = true"> Propose a post on X </Button>
    </div>
    <NewPostModal :modal-open="newPostModalOpen" @close="newPostModalOpen = false" />
  </div>
</template>
