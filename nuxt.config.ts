import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import inject from '@rollup/plugin-inject'
import { Buffer } from "buffer";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  pages: true,
  ssr: false,
  app: {
    pageTransition: {
      name: 'fade',
      mode: 'out-in'
    },
    head: {
      title: 'The Garden',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon-dark.ico', media: "(prefers-color-scheme: dark)" },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon-light.ico', media: "(prefers-color-scheme: light)" },
        {
          // rel: 'preload',
          href: '/fonts/raleway.woff2',
          as: 'font',
          type: 'font/woff2',
        },
        {
          // rel: 'preload',
          href: '/fonts/sig.woff2',
          as: 'font',
          type: 'font/woff2',
        },
      ],
    }
  },
  dir: {
    pages: 'src/pages',
    middleware: 'src/middleware',
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@hebilicious/vue-query-nuxt',
    [
      '@use-wagmi/nuxt',
      {
        excludeImports: ['useQuery'],
      }
    ],
  ],
  css: [
    '@/assets/css/fonts.css',
  ],
  plugins: [
    '@/plugins/wagmi',
  ],
  alias: {
    '@': path.resolve(__dirname, 'src')
  },
  build: {
		/* rollupOptions: {
			plugins: [inject({ Buffer: ['buffer', 'Buffer'] })],
		}, */
	},
  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL ?? '',
      GRAPHQL_URL: process.env.GRAPHQL_URL ?? '',
      THEGARDEN_CONTRACT_ADDRESS: process.env.THEGARDEN_CONTRACT_ADDRESS ?? '',
      THEGARDEN_OWNER_ADDRESS: process.env.THEGARDEN_OWNER_ADDRESS ?? '',
      NETWORK: process.env.NETWORK ?? '',
      PINATA_API_JWT: process.env.PINATA_API_JWT ?? '',
      PINATA_API_KEY: process.env.PINATA_API_KEY ?? '',
      PINATA_IPFS_URL: process.env.PINATA_IPFS_URL ?? '',
      LIGHTHOUSE_API_KEY: process.env.LIGHTHOUSE_API_KEY ?? '',
    },
  },
})
