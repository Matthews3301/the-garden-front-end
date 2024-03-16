<script setup lang="ts">
import { computed } from 'vue';
import { useAccount } from 'use-wagmi';

import Divider from '@/atoms/Divider';
import Post from './Post.vue';

import useGraphAccepteds from '@/composables/useGraphAccepteds';
import useGraphAddeds from '@/composables/useGraphAddeds';
import useGraphAcceptor from '@/composables/useGraphAcceptor';

const { address } = useAccount();
const { data: ipfsHashesAdded } = useGraphAddeds();
const { data: ipfsHashesAccepted } = useGraphAccepteds();
const { data: isAcceptor } = useGraphAcceptor(address?.value);

const acceptedHashList = computed(
  () =>
    ipfsHashesAccepted?.value?.ipfsHashAccepteds.map((acceptedObject) => acceptedObject.ipfsHash) ??
    [],
);
</script>

<template>
  <div>
    <Divider />
    <div v-for="ipfsHashObject in ipfsHashesAdded?.ipfsHashAddeds">
      <Post
        :key="ipfsHashObject.ipfsHash"
        :post="ipfsHashObject"
        :accepted-list="acceptedHashList"
        :address="address"
        :is-acceptor="isAcceptor"
      />
    </div>
  </div>
</template>
