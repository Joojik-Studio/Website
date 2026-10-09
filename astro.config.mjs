// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { siteConfig } from './site.config.mjs';

export default defineConfig({
  site: siteConfig.origin,
  base: siteConfig.base,
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  i18n: {
    locales: ['fa', 'en'],
    defaultLocale: 'fa',
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
  integrations: [
    sitemap({
      filter: (url) => /\/(fa|en)\//.test(new URL(url).pathname),
      i18n: { defaultLocale: 'fa', locales: { fa: 'fa', en: 'en' } },
    }),
  ],
});
