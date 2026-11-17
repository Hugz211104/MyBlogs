import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://myblogs.nhokhungtg182.workers.dev',
  output: 'static',
  compressHTML: true,
  markdown: {
    shikiConfig: {
      theme: 'one-dark-pro',
      wrap: true,
    },
  },
});
