<script setup lang="ts">
import { defineProps, ref, watchEffect } from 'vue';
import Button from '@/atoms/Button/index.vue';
import Spinner from '@/atoms/Spinner/index.vue';
import type { GraphAdded } from '@/composables/useGraphAddeds';
import { formatDateTime, truncateAddress } from '@/utils/formatters';
import { isSameAddress } from '@/utils/web3';
import useGetIpfsHashContent from '@/composables/useGetIpfsHashContent';
import { useAccount, useConnect, useWaitForTransactionReceipt, useWriteContract } from 'use-wagmi';
import { injected } from 'use-wagmi/connectors';
import useGraphAccepteds from '@/composables/useGraphAccepteds';
import theGardenContract from '@/contracts/theGardenContract';
import useAlert, { AlertType } from '@/composables/useAlert';

// PROPS
const props = defineProps<{
  post: GraphAdded;
  acceptedList: string[];
  address?: string;
  isAcceptor?: boolean;
}>();

// REFS
const accepting = ref(false);

// COMPOSABLES
const { status } = useAccount();
const { connect } = useConnect();
const { data: contractWriteHash, error: contractWriteError, writeContract } = useWriteContract();
const { isSuccess: contractWriteIsSuccess } = useWaitForTransactionReceipt({
  hash: contractWriteHash,
});
const { showAlert } = useAlert();
const { abi, address: theGardenContractAddress, ownerAddress } = theGardenContract();

const { data: ipfsHashString, isLoading } = useGetIpfsHashContent(props.post.ipfsHash);
const { refetch: refetchAccepteds } = useGraphAccepteds();

// COMPUTED
const isAccepted = props.acceptedList.includes(props.post.ipfsHash);
const isOwner = isSameAddress(props.address, ownerAddress)

// WATCHERS
watchEffect(() => {
  if (contractWriteError.value) {
    accepting.value = false;
    console.error('Error writing to contract:', contractWriteError.value);
    showAlert({
      type: AlertType.Error,
      message: 'Error accepting post 😢',
    });
  }

  if (contractWriteIsSuccess.value) {
    accepting.value = false;
    console.log('Successfully wrote to contract');
    showAlert({
      type: AlertType.Success,
      message: 'Accepted post! 🎉',
    });
    refetchAccepteds();
  }
});

// METHODS
function acceptPost() {
  accepting.value = true;
  console.log('Accepting post:', props.post.ipfsHash);

  writeContract({
    address: theGardenContractAddress,
    abi,
    functionName: 'acceptIpfsHash',
    args: [props.post.ipfsHashIndex],
  });
}
</script>

<template>
  <div class="py-4 flex justify-between items-center" :class="{ 'opacity-50': isAccepted }">
    <div>
      <p class="text-primary mb-1">
        {{ truncateAddress(post.proposer) }}
      </p>
      <p v-if="isLoading" class="mb-1">Loading...</p>
      <p v-else class="mb-1">
        {{ ipfsHashString ?? '-' }}
      </p>
      <p class="text-sm text-slate-600 mb-1">
        {{ formatDateTime(Number(post.blockTimestamp) * 1000) }}
      </p>
    </div>
    <div>
      <Button v-if="isAccepted" type="Light" class="min-w-40" disabled> ✅ Accepted </Button>
      <Button
        v-else-if="status !== 'connected'"
        type="Light"
        class="min-w-40"
        @click="() => connect({ connector: injected() })"
      >
        Connect wallet
      </Button>
      <Button
        v-else-if="!isOwner && (!isAcceptor || isSameAddress(post.proposer, address))"
        type="Light"
        class="min-w-40"
        disabled
      >
        Not allowed
      </Button>
      <Button v-else type="Light" class="min-w-40" @click="acceptPost">
        <Spinner v-if="accepting" size="sm" class="inline-block mr-2" />
        <span v-else>Accept</span>
      </Button>
    </div>
  </div>
</template>
