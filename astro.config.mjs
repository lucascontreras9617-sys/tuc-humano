import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://tuc-humano.com.ar',
  output: 'hybrid',
  adapter: vercel(),
  integrations: [tailwind(), sitemap()],
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
    remotePatterns: [{ protocol: 'https' }],
  },
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: { 'vendor': [] },
        },
      },
    },
  },
  server: {
    port: 4321,
  },
});