/** Change these values when the final domain and real content are ready. */
export const siteConfig = {
  origin: process.env.SITE_ORIGIN || 'https://joojikstudio.ir',
  // For the default GitHub project URL, use '/Website/' and its github.io origin.
  base: `/${(process.env.SITE_BASE_PATH || '').replace(/^\/+|\/+$/g, '')}/`.replace(
    '//',
    '/',
  ),
  indexable: process.env.SITE_INDEXABLE === 'true',
};
