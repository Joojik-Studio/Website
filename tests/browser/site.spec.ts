import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = [
  '',
  'games/block-tower/',
  'games/block-tower/privacy-policy/',
  'games/block-tower/terms-of-service/',
];
const widths = [320, 390, 768, 1440];

for (const locale of ['fa', 'en']) {
  for (const width of widths) {
    test(`${locale} at ${width}px: layout, fonts, links, and accessibility`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const route of routes) {
        await page.goto(`/${locale}/${route}`);
        await page.evaluate(() => document.fonts.ready);
        await expect(page.locator('h1')).toHaveCount(1);
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true);
        expect(
          await page
            .locator('body')
            .evaluate((el) => getComputedStyle(el).fontFamily),
        ).toContain('Almarai');
        expect(
          await page.evaluate(() => document.fonts.check('16px Almarai')),
        ).toBe(true);
        const results = await new AxeBuilder({ page })
          .withTags([
            'wcag2a',
            'wcag2aa',
            'wcag21a',
            'wcag21aa',
            'wcag22a',
            'wcag22aa',
          ])
          .analyze();
        expect(
          results.violations,
          JSON.stringify(
            results.violations.map(({ id, nodes }) => ({
              id,
              targets: nodes.map((node) => node.target),
            })),
          ),
        ).toEqual([]);
        await page.screenshot({
          path: `test-results/screenshots/${locale}-${width}-${route.includes('privacy') ? 'privacy' : route.includes('terms') ? 'terms' : route ? 'game' : 'studio'}.png`,
          fullPage: true,
        });
      }
    });
  }
}

test('switching languages keeps the equivalent page', async ({ page }) => {
  for (const route of routes) {
    await page.goto(`/fa/${route}`);
    await page.locator('nav a[hreflang="en"]').click();
    await expect(page).toHaveURL(new RegExp(`/en/${route}$`));
    await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
    await page.locator('nav a[hreflang="fa"]').click();
    await expect(page).toHaveURL(new RegExp(`/fa/${route}$`));
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  }
});

test('keyboard skip link, touch targets, reduced motion, and public JSON', async ({
  page,
  request,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/fa/');
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip-link')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  for (const link of await page
    .locator('.button:visible, .locale-nav a:visible, .main-nav a:visible')
    .all()) {
    expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect(
    await page
      .locator('html')
      .evaluate((el) => getComputedStyle(el).scrollBehavior),
  ).toBe('auto');
  expect(
    await page
      .locator('.button')
      .first()
      .evaluate((el) => getComputedStyle(el).transitionDuration),
  ).toBe('0s');
  const response = await request.get('/configs/block-tower.json');
  expect(response.ok()).toBe(true);
  expect(response.headers()['content-type']).toContain('application/json');
  expect(await response.json()).toEqual({});
});

test('root and every content page work with JavaScript disabled', async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    locale: 'en-US',
  });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4321/');
  await expect(page).toHaveURL('http://127.0.0.1:4321/fa/');
  for (const locale of ['fa', 'en'])
    for (const route of routes) {
      await page.goto(`http://127.0.0.1:4321/${locale}/${route}`);
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
    }
  await context.close();
});
