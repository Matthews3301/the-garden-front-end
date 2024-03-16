import { polygon } from 'use-wagmi/chains';

const networks = {
  137: {
    name: 'Polygon',
    wagmiChain: polygon,
  },
} as { [key: number]: any };


export function getNetworkData(id: number) {
  return networks[id];
}