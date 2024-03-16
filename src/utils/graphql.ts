import { ApolloClient, InMemoryCache } from '@apollo/client';
import env from './env';

const APIURL = env().GRAPHQL_URL;

function createApolloClient() {
  return new ApolloClient({
    uri: APIURL,
    cache: new InMemoryCache(),
  });
}

export const graphQlClient = createApolloClient();
