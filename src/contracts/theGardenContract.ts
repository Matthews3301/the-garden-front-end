import env from '@/utils/env';
import abi from './abi/TheGarden.json';

const address = env().THEGARDEN_CONTRACT_ADDRESS as `0x${string}`;

const ownerAddress = env().THEGARDEN_OWNER_ADDRESS.toLowerCase();

export default function useTheGardenContract() {
  return {
    address,
    ownerAddress,
    abi,
  };
}
