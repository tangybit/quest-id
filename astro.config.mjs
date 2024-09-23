import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';

export default defineConfig({
  site: 'https:mop-quest-id.netlify.app', 
  integrations: [
    tailwind(), 
  ],
  adapter: netlify(),
  build: {
    dist: 'dist',
    vite: {},
  },
});
