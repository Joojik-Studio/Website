import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { load } from 'cheerio';
import { siteConfig } from '../site.config.mjs';

const base = siteConfig.base.replace(/\/$/, '');
const origin = siteConfig.origin;
const pages = [
  '',
  'games/block-tower/',
  'games/block-tower/privacy-policy/',
  'games/block-tower/terms-of-service/',
];
const locales = ['fa', 'en'];
const read = (file) => readFile(path.join('dist', file), 'utf8');
const absolute = (url) => new URL(url, origin).href;

for (const locale of locales) {
  for (const page of pages) {
    test(`${locale}/${page}: localized metadata, static content, and links`, async () => {
      const $ = load(await read(`${locale}/${page}index.html`));
      const pathname = `${base}/${locale}/${page}`;
      assert.equal($('html').attr('lang'), locale);
      assert.equal($('html').attr('dir'), locale === 'fa' ? 'rtl' : 'ltr');
      assert.equal($('h1').length, 1);
      assert.equal($('title').length, 1);
      assert.ok($('meta[name="description"]').attr('content').length > 20);
      assert.equal(
        $('meta[name="robots"]').attr('content'),
        siteConfig.indexable ? 'index, follow' : 'noindex, follow',
      );
      assert.equal($('link[rel="canonical"]').length, 1);
      assert.equal($('link[rel="canonical"]').attr('href'), absolute(pathname));
      for (const lang of locales) {
        const url = `${base}/${lang}/${page}`;
        assert.equal($(`link[hreflang="${lang}"]`).attr('href'), absolute(url));
        assert.equal($(`nav a[hreflang="${lang}"]`).attr('href'), url);
      }
      assert.equal(
        $('link[hreflang="x-default"]').attr('href'),
        absolute(`${base}/fa/${page}`),
      );
      assert.equal(
        $('meta[property="og:url"]').attr('content'),
        absolute(pathname),
      );
      assert.equal(
        $('meta[property="og:image"]').attr('content'),
        absolute(`${base}/images/social-preview.png`),
      );
      assert.equal(
        $('script:not([type="application/ld+json"])').length,
        0,
        'no runtime JavaScript required',
      );
      assert.equal($('a[href="#"]').length, 0, 'no dummy links');

      for (const element of $('a[href], img[src], link[href]').toArray()) {
        const url = $(element).attr('href') ?? $(element).attr('src');
        if (!url || /^(https?:|mailto:|data:)/.test(url)) continue;
        if (url.startsWith('#')) {
          assert.ok($(`[id="${url.slice(1)}"]`).length, `anchor ${url} exists`);
          continue;
        }
        assert.ok(url.startsWith(`${base}/`), `${url} respects base ${base}`);
        const [pathname, hash] = url.slice(base.length).split('#');
        const file = pathname.endsWith('/')
          ? `${pathname}index.html`
          : pathname;
        await stat(path.join('dist', file));
        if (hash)
          assert.ok(
            load(await read(file))(`[id="${hash}"]`).length,
            `${url} anchor exists`,
          );
      }
      for (const img of $('img').toArray()) {
        assert.ok($(img).attr('width') && $(img).attr('height'));
        assert.notEqual($(img).attr('alt'), undefined);
      }
      if (page.includes('policy') || page.includes('terms')) {
        const kind = page.split('/').filter(Boolean).at(-1);
        const source = JSON.parse(
          await readFile(`src/content/games/block-tower/${kind}.json`, 'utf8'),
        );
        const content = source.locales[locale];
        const normalize = (text) => text.replace(/\s+/g, ' ').trim();
        assert.equal($('.draft-notice').length, 0);
        assert.equal($('h1').text(), content.title);
        assert.equal($('time').attr('datetime'), source.effectiveDate);
        assert.equal(
          $('.document-body section').length,
          content.sections.length,
        );
        assert.deepEqual(
          $('.document-intro')
            .toArray()
            .map((el) => normalize($(el).text())),
          content.introduction.map(normalize),
        );
        assert.deepEqual(
          source.locales.fa.sections.map((s) => s.id),
          source.locales.en.sections.map((s) => s.id),
        );
        assert.equal(
          new Set(content.sections.map((s) => s.id)).size,
          content.sections.length,
        );
        for (const section of content.sections) {
          const rendered = $(`section[id="${section.id}"]`);
          assert.equal(rendered.find('h2').text(), section.title);
          assert.deepEqual(
            rendered
              .find('p')
              .toArray()
              .map((el) => normalize($(el).text())),
            section.paragraphs.map(normalize),
          );
          assert.deepEqual(
            rendered
              .find('li')
              .toArray()
              .map((el) => normalize($(el).text())),
            section.bullets.map(normalize),
          );
        }
        assert.ok(
          $('.document-body a[href="mailto:joojik.studio@gmail.com"]').length,
        );
      }
    });
  }
}

test('root redirects without JavaScript and has visible fallback links', async () => {
  const $ = load(await read('index.html'));
  assert.equal(
    $('meta[http-equiv="refresh"]').attr('content'),
    `0;url=${base}/fa/`,
  );
  assert.ok($(`a[href="${base}/fa/"]`).text());
  assert.ok($(`a[href="${base}/en/"]`).text());
  assert.equal($('script').length, 0);
});

test('configuration is exactly an empty JSON object', async () => {
  assert.equal((await read('configs/block-tower.json')).trim(), '{}');
  assert.deepEqual(JSON.parse(await read('configs/block-tower.json')), {});
});

test('sitemap and robots use the deployment address and bilingual routes', async () => {
  const index = load(await read('sitemap-index.xml'), { xml: true });
  const sitemapUrl = index('loc').text();
  assert.ok(sitemapUrl.startsWith(`${origin}${base}/`));
  const sitemap = load(
    await read(new URL(sitemapUrl).pathname.slice(base.length)),
    { xml: true },
  );
  const urls = sitemap('url > loc')
    .toArray()
    .map((node) => sitemap(node).text());
  assert.equal(urls.length, 8);
  for (const locale of locales)
    for (const page of pages)
      assert.ok(urls.includes(absolute(`${base}/${locale}/${page}`)));
  assert.equal(sitemap('url').first().find('xhtml\\:link').length, 2);
  assert.ok(
    (await read('robots.txt')).includes(
      `Sitemap: ${origin}${base}/sitemap-index.xml`,
    ),
  );
  assert.ok(
    !(await read('robots.txt')).includes('Disallow: /'),
    'crawlers can read noindex',
  );
});

test('404 stays out of search and provides both language destinations', async () => {
  const $ = load(await read('404.html'));
  assert.equal($('meta[name="robots"]').attr('content'), 'noindex, follow');
  assert.equal($('link[rel="canonical"]').length, 0);
  for (const locale of locales)
    assert.ok($(`a[href="${base}/${locale}/"]`).length);
});
