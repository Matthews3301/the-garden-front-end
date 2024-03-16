import { graphQlClient } from '@/utils/graphql';
import { gql } from '@apollo/client';
import { useQuery } from '@tanstack/vue-query';

const GRAPHQL_QUERY_GET_IPFS_HASH_ADDEDS = `
  query getIpfsHashAddeds {
    ipfsHashAddeds(orderBy: blockNumber, first: 10, orderDirection: desc) {
      blockTimestamp
      blockNumber
      id
      ipfsHash
      ipfsHashIndex
      proposer
      transactionHash
    }
  }
`;

export interface GraphAdded {
  blockTimestamp: string;
  blockNumber: number;
  id: string;
  ipfsHash: string;
  ipfsHashIndex: number;
  proposer: string;
  transactionHash: string;
}

interface GraphAddedsResponse {
  ipfsHashAddeds: GraphAdded[];
}

export default function useGraphAddeds() {
  const fetchData = async () => {
    console.log('Fetching ipfsHashAddeds');

    try {
      const response = await graphQlClient.query({
        query: gql(GRAPHQL_QUERY_GET_IPFS_HASH_ADDEDS),
        fetchPolicy: 'network-only'
      });

      return response?.data ?? { ipfsHashAddeds: [] };
    } catch (error) {
      console.error('Error fetching subgraph data - ipfsHashAddeds', error);
      return { ipfsHashAddeds: [] };
    }
  };

  return useQuery<GraphAddedsResponse>({
    queryKey: ['ipfsHashAddeds'],
    queryFn: fetchData,
    refetchOnWindowFocus: true,
    refetchInterval: 10000,
  });
}
