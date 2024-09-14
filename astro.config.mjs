import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://dotkine.com',
  integrations: [
    tailwind(),
  ],
  output: 'static',  // Default is static site generation; can be customized
  build: {
    dist: 'dist',  // Default output directory
    vite: {},
  },
});