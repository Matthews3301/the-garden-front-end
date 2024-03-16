<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue';

import { useAccount, useConnect, useWriteContract, useWaitForTransactionReceipt } from 'use-wagmi';
import { injected } from 'use-wagmi/connectors';

import Modal from '@/atoms/Modal/index.vue';
import Button from '@/atoms/Button/index.vue';
import Spinner from '@/atoms/Spinner/index.vue';

import theGardenContract from '@/contracts/theGardenContract';
import useAlert, { AlertType } from '@/composables/useAlert';
import useGraphAddeds from '@/composables/useGraphAddeds';
import usePostIpfsHashContent from '@/composables/usePostIpfsHashContent';

// PROPS
const props = defineProps<{
  modalOpen: boolean;
}>();
const emit = defineEmits(['close']);

// COMPOSABLES
const { status } = useAccount();
const { connect } = useConnect();
const {
  data: contractWriteHash,
  isPending: contractWritePending,
  error: contractWriteError,
  writeContract,
} = useWriteContract();
const { isLoading: contractWriteIsLoading, isSuccess: contractWriteIsSuccess } =
  useWaitForTransactionReceipt({
    hash: contractWriteHash,
  });
const { abi, address } = theGardenContract();
const { refetch } = useGraphAddeds();
const { showAlert } = useAlert();

// REFS
const submitting = ref(false);
const creatingIpfsHash = ref(false);
const postText = ref('');
const textareaRef = ref(null);

// COMPUTED
const walletConnected = computed(() => status.value === 'connected');

// WATCHERS
watch(
  () => props.modalOpen,
  (newVal) => {
    if (newVal) {
      textareaRef.value!.focus();
    }
  },
);

watchEffect(() => {
  if (contractWriteError.value) {
    submitting.value = false;
    console.error('Error writing to contract:', contractWriteError.value);
    showAlert({
      type: AlertType.Error,
      message: 'Error submitting post to contract 😢',
    });
  }

  if (contractWriteIsSuccess.value) {
    submitting.value = false;
    console.log('Successfully wrote to contract');
    showAlert({
      type: AlertType.Success,
      message: 'Submitted post to contract! 🎉',
    });
    refetch();
    emit('close');
  }
});

// METHODS
async function proposePost() {
  submitting.value = true;

  console.log('Proposing post:', postText.value);
  console.log('Creating IPFS hash...');

  creatingIpfsHash.value = true;
  let newIpfsHash;
  try {
    const text = postText.value.slice(0, 280);  
    newIpfsHash = await usePostIpfsHashContent(text);
    console.log('IPFS hash:', newIpfsHash);
  } catch (error) {
    console.error('Error uploading JSON to IPFS:', error);
    return null;
  }
  creatingIpfsHash.value = false;

  console.log('Submitting IPFS hash to contract...');
  writeContract({
    address,
    abi,
    functionName: 'addIpfsHash',
    args: [newIpfsHash],
  });
}

function processSubmitButtonClick() {
  if (walletConnected.value) {
    proposePost();
  } else {
    connect({ connector: injected() });
  }
}
</script>

<template>
  <Modal :modal-open="props.modalOpen" @close="emit('close')">
    <h3 class="font-bold text-lg mb-4">What should we post?</h3>
    <form @submit.prevent="processSubmitButtonClick">
      <textarea
        ref="textareaRef"
        v-model="postText"
        class="border border-cream-dark border-1 px-4 py-2 rounded-md focus:outline-none focus:border-secondary w-full mb-4"
        placeholder="Your post here..."
        rows="4"
        maxlength="280"
        autofocus
      ></textarea>
      <div class="modal-action justify-end">
        <Button class="w-[100%] h-10" :disabled="walletConnected && !postText">
          <div v-if="submitting" class="flex">
            <Spinner size="sm" class="inline-block mr-2" />
            <span v-if="creatingIpfsHash" class="text-md font-normal text-slate-200"
              >Creating IPFS hash... 📂</span
            >
            <span v-if="contractWritePending" class="text-md font-normal text-slate-200"
              >Submitting transaction to wallet... 💳</span
            >
            <span v-if="contractWriteIsLoading" class="text-md font-normal text-slate-200"
              >Waiting for transaction to be confirmed... 🤝</span
            >
          </div>
          <span v-else-if="walletConnected">Submit</span>
          <span v-else>Connect wallet</span>
        </Button>
      </div>
    </form>
  </Modal>
</template>
