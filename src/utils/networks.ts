import { polygon, base } from 'use-wagmi/chains';

const networks = {
  137: {
    name: 'Polygon',
    wagmiChain: polygon,
  },
  8453: {
    name: 'Base',
    wagmiChain: base,
  }
} as { [key: number]: any };


export function getNetworkData(id: number) {
  return networks[id];
}