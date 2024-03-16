import { graphQlClient } from '@/utils/graphql';
import { gql } from '@apollo/client';
import { useQuery } from '@tanstack/vue-query';

const GRAPHQL_QUERY_GET_IPFS_HASH_ACCEPTEDS = `
  query getIpfsHashAccepteds {
    ipfsHashAccepteds(orderBy: blockNumber, first: 10, orderDirection: desc) {
      acceptor
      blockNumber
      blockTimestamp
      id
      ipfsHash
      ipfsHashIndex
      transactionHash
    }
  }
`;

interface GraphAcceptedsResponse {
  ipfsHashAccepteds: {
    acceptor: string;
    blockNumber: number;
    blockTimestamp: string;
    id: string;
    ipfsHash: string;
    ipfsHashIndex: number;
    transactionHash: string;
  }[];
}

export default function useGraphAccepteds() {
  const fetchData = async () => {
    console.log('Fetching ipfsHashAccepteds');

    try {
      const response = await graphQlClient.query({
        query: gql(GRAPHQL_QUERY_GET_IPFS_HASH_ACCEPTEDS),
        fetchPolicy: 'network-only'
      });

      return response?.data ?? { ipfsHashAccepteds: [] };
    } catch (error) {
      console.error('Error fetching subgraph data - ipfsHashAccepteds', error);
      return { ipfsHashAccepteds: [] };
    }
  };

  return useQuery<GraphAcceptedsResponse>({
    queryKey: ['ipfsHashAccepteds'],
    queryFn: fetchData,
    refetchOnWindowFocus: true,
    refetchInterval: 10000,
  });
}
