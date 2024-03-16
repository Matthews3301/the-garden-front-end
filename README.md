# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.


## Contract deployments

```
1. Update solidity file
2. yarn compile-the-garden
3. yarn deploy-the-garden
4. Deploy Subgraph
5. Update .evn - contract address
6. Update ABI
7. [optional] Update GraphQl queries
8. yarn create-ipfs-hash:the-garden
9. Create/update Gelato function

```



## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

If you're using VSCode, make sure to insall `TypeScript Vue Plugin (Volar)` and `vue` extensions.