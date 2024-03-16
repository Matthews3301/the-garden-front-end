import { useQuery } from '@tanstack/vue-query';
import env from '@/utils/env';
import axios from 'axios';

export default function useGetIpfsHashContent(cid: string) {
  const fetchData = async () => {
    console.log('Fetching ipfsHashContent', cid);

    try {
      const response = await axios.get(`https://gateway.lighthouse.storage/ipfs/${cid}`);

      return response?.data ?? '-';
    } catch (error) {
      console.error('Error fetching IPFS data - ipfsHashContent', error);
      return '-';
    }
  };

  return useQuery<string>({
    queryKey: ['ipfsHashContent', cid],
    queryFn: fetchData,
    refetchOnWindowFocus: true,
    retry: 0,
  });
}








/*
* PINATA VERSION
*
* 
const API_KEY = env().PINATA_API_KEY;
const PINATA_IPFS_URL = env().PINATA_IPFS_URL;
try {
  const response = await axios.get(
    `${PINATA_IPFS_URL}/${cid}?pinataGatewayToken=${API_KEY}`
  );

  return response?.data ?? '-';
} catch (error) {
  console.error('Error fetching IPFS data - ipfsHashContent', error);
  return '-';
}
*/