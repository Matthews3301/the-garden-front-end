import { getNetworkData } from '@/utils/networks';
import { http, UseWagmiPlugin, createConfig } from 'use-wagmi';
import { injected } from 'use-wagmi/connectors';

export default defineNuxtPlugin((nuxt) => {
  console.log('wagmi');

  const runtimeConfig = useRuntimeConfig();
  const networkId = Number(runtimeConfig.public.NETWORK);
  const { wagmiChain } = getNetworkData(networkId)

  const config = createConfig({
    chains: [wagmiChain],
    connectors: [injected()],
    transports: {
      [networkId]: http(),
    },
  });

  nuxt.vueApp.use(UseWagmiPlugin, { config });
});
