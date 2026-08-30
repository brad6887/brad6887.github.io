// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import orchidTimeline from './src/lib/orchid-timeline.mjs';

// https://astro.build/config
export default defineConfig({
  markdown: { processor: satteri({ mdastPlugins: [orchidTimeline()] }) },
  redirects: {
    '/projects/': '/',
  },
});
