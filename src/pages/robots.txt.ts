import type { APIRoute } from 'astro';
import { siteConfig } from '../../site.config.mjs';
export const GET: APIRoute = ({ site }) =>
  new Response(
    `User-agent: *\nAllow: /\n\nSitemap: ${new URL(`${siteConfig.base.replace(/\/$/, '')}/sitemap-index.xml`, site).href}\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
