interface Env {
  [key: string]: string;
}

const env = () => {
  const config = useRuntimeConfig();

  return {
    BASE_URL: config.public.BASE_URL ?? '',
    GRAPHQL_URL: config.public.GRAPHQL_URL ?? '',
    THEGARDEN_CONTRACT_ADDRESS: config.public.THEGARDEN_CONTRACT_ADDRESS ?? '',
    THEGARDEN_OWNER_ADDRESS: config.public.THEGARDEN_OWNER_ADDRESS ?? '',
    NETWORK: config.public.NETWORK ?? '',
    PINATA_API_JWT: config.public.PINATA_API_JWT ?? '',
    PINATA_API_KEY: config.public.PINATA_API_KEY ?? '',
    PINATA_IPFS_URL: config.public.PINATA_IPFS_URL ?? '',
    LIGHTHOUSE_API_KEY: config.public.LIGHTHOUSE_API_KEY ?? '',
  } as Env;
};

export default env;
