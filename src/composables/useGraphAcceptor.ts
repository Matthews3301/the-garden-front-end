import { graphQlClient } from '@/utils/graphql';
import { gql } from '@apollo/client';
import { useQuery } from '@tanstack/vue-query';
import useTheGardenContract from '@/contracts/theGardenContract';

const GRAPHQL_QUERY_CHECK_IF_ACCEPTOR_EXISTS = `
  query checkIfAcceptorExists($address: String) {
    acceptorAddeds(first: 1, where: {acceptor: $address}) {
      id
      acceptor
      acceptorIndex
    }
  }
`;

export default function useGraphAcceptor(address?: string) {
  const { ownerAddress } = useTheGardenContract();

  const fetchData = async () => {
    console.log('Fetching graphAcceptor', address);

    const formattedAddress = address!.toLowerCase();
    if (formattedAddress === ownerAddress) {
      return true;
    }

    try {
      const response = await graphQlClient.query({
        query: gql(GRAPHQL_QUERY_CHECK_IF_ACCEPTOR_EXISTS),
        variables: {
          address: formattedAddress,
        },
      });

      return response?.data?.acceptorAddeds.length > 0;
    } catch (error) {
      console.error('Error fetching subgraph data - graphAcceptor', error);
      return false;
    }
  };

  return useQuery<boolean>({
    queryKey: ['graphAcceptor', address],
    queryFn: fetchData,
    refetchOnWindowFocus: true,
    enabled: !!address,
  });
}
