<script lang="ts" setup>
import { useAccount, useDisconnect, useConnect } from 'use-wagmi';
import { injected } from 'use-wagmi/connectors';

import { truncateAddress } from '@/utils/formatters';

const { address, status } = useAccount();
const { disconnect } = useDisconnect();
const { connect } = useConnect();

function processAccountButtonClick() {
  if (status.value === 'connected') {
    const confirm = window.confirm('Are you sure you want to disconnect?');
    if (confirm) {
      disconnect();
    }
  } else {
    connect({ connector: injected() });
  }
}
</script>
<template>
  <div class="flex">
    <button
      class="center-middle min-w-[8rem] min-h-[30px] bg-white bg-opacity-0 hover:bg-opacity-20 active:bg-opacity-30 text-sm rounded-full border border-green-dark shadow-none select-none"
      @click="processAccountButtonClick"
    >
      <div v-if="status === 'connected'" title="Disconnect wallet">
        {{ truncateAddress(address ?? '0x') }}
      </div>
      <div v-else title="Connect wallet">Connect wallet</div>
    </button>
  </div>
</template>
