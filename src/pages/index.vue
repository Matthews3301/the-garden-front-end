<script setup lang="ts">
import NavBar from '@/components/NavBar';
import TopBanner from '@/components/TopBanner';
import PostsList from '@/components/PostsList';
import Alert from '@/atoms/Alert';
</script>

<template>
  <div>
    <div class="bg-white flex flex-col items-center justify-center min-h-full font-raleway">
      <NavBar />
      <TopBanner />
      <div class="max-w-screen-md w-full pt-8 pb-32 px-6">
        <PostsList />
      </div>
      <Alert />
    </div>
  </div>
</template>
