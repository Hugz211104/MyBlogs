import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://tenban.pages.dev',
  output: 'static',
  compressHTML: true,
  markdown: {
    shikiConfig: {
      theme: 'one-dark-pro',
      wrap: true,
    },
  },
});
