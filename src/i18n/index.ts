import { getRelativeLocaleUrl } from 'astro:i18n';

export const locales = ['fa', 'en'] as const;
export type Locale = (typeof locales)[number];
export type LegalKind = 'privacy-policy' | 'terms-of-service';

export function isLocale(value: string | undefined): value is Locale {
  return value === 'fa' || value === 'en';
}

/** Astro's helper includes the configured deployment base. */
export function localeUrl(locale: Locale, path = '') {
  return getRelativeLocaleUrl(locale, path.replace(/^\/+|\/+$/g, ''), {
    normalizeLocale: false,
  }).replace(/\/?$/, '/');
}

export function assetUrl(path: string) {
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

interface Copy {
  brand: string;
  navLabel: string;
  languageLabel: string;
  home: string;
  games: string;
  about: string;
  skip: string;
  explore: string;
  gameLink: string;
  heroLines: [string, string];
  studioDescription: string;
  studioTitle: string;
  gamesIntro: string;
  featured: string;
  gameDescription: string;
  aboutTitle: string;
  aboutDescription: string;
  footerLine: string;
  sampleLabel: string;
  sampleNote: string;
  illustration: string;
  gamePageDescription: string;
  gameIntro: string;
  gameAboutTitle: string;
  gameAboutDescription: string;
  downloadTitle: string;
  comingSoon: string;
  comingSoonDescription: string;
  legalTitle: string;
  legalDescription: string;
  privacy: string;
  terms: string;
  backToGame: string;
  effectiveDate: string;
  notFoundTitle: string;
  notFoundDescription: string;
}

export const copy: Record<Locale, Copy> = {
  en: {
    brand: 'Joojik Studio',
    navLabel: 'Main navigation',
    languageLabel: 'Language',
    home: 'Studio',
    games: 'Our games',
    about: 'About us',
    skip: 'Skip to content',
    explore: 'Explore our games',
    gameLink: 'Meet Block Tower',
    heroLines: ['A little studio.', 'A lot of play.'],
    studioDescription:
      'Welcome to Joojik Studio. A small game studio with a soft spot for casual games and little moments of play.',
    studioTitle: 'Joojik Studio — A little studio. A lot of play.',
    gamesIntro: 'A little look at what we’re making.',
    featured: 'From our studio',
    gameDescription:
      'Meet Block Tower, a game from Joojik Studio. More about the game will be shared here soon.',
    aboutTitle: 'Small studio, curious minds.',
    aboutDescription:
      'This is our little corner of the internet. Get to know our games, find download links, and read the information that goes with them.',
    footerLine: 'A little more play in your day.',
    sampleLabel: 'Website preview',
    sampleNote: 'Sample content for now. More to come.',
    illustration: 'Illustration · not a gameplay screenshot',
    gamePageDescription:
      'Discover Block Tower from Joojik Studio. Find game information, download links, privacy policy, and terms of service.',
    gameIntro: 'A new page in our little world of games.',
    gameAboutTitle: 'Say hello to Block Tower.',
    gameAboutDescription:
      'This space will introduce the game and what you can expect when you play. For now, this is sample text while we get the details ready.',
    downloadTitle: 'A little play, on the way.',
    comingSoon: 'Download links coming soon',
    comingSoonDescription:
      'When the store pages are ready, you’ll find the links right here.',
    legalTitle: 'The details matter, too.',
    legalDescription:
      'Information about privacy and using Block Tower, in your language.',
    privacy: 'Privacy policy',
    terms: 'Terms of service',
    backToGame: 'Back to Block Tower',
    effectiveDate: 'Effective date',
    notFoundTitle: 'This little corner is empty.',
    notFoundDescription:
      'We couldn’t find that page. Head back to the studio and find your way from there.',
  },
  fa: {
    brand: 'استودیو جوجیک',
    navLabel: 'راهبری اصلی',
    languageLabel: 'زبان',
    home: 'استودیو',
    games: 'بازی‌های ما',
    about: 'دربارهٔ ما',
    skip: 'رفتن به محتوا',
    explore: 'بازی‌های ما را ببینید',
    gameLink: 'آشنایی با Block Tower',
    heroLines: ['یک استودیوی کوچک.', 'دنیایی از بازی.'],
    studioDescription:
      'به استودیو جوجیک خوش آمدید. یک استودیوی کوچک بازی‌سازی، با علاقه‌ای بزرگ به بازی‌های کژوال و لحظه‌های کوتاه بازی.',
    studioTitle: 'استودیو جوجیک — یک استودیوی کوچک، دنیایی از بازی',
    gamesIntro: 'نگاهی کوتاه به بازی‌هایی که می‌سازیم.',
    featured: 'از استودیوی ما',
    gameDescription:
      'با Block Tower، یکی از بازی‌های استودیو جوجیک، آشنا شوید. به‌زودی اطلاعات بیشتری دربارهٔ بازی در اینجا می‌خوانید.',
    aboutTitle: 'استودیویی کوچک، ذهن‌هایی کنجکاو.',
    aboutDescription:
      'اینجا گوشهٔ کوچک ما در اینترنت است. با بازی‌های ما آشنا شوید، لینک‌های دانلود را پیدا کنید و اطلاعات مربوط به هر بازی را بخوانید.',
    footerLine: 'کمی بازی بیشتر در روز شما.',
    sampleLabel: 'پیش‌نمایش وب‌سایت',
    sampleNote: 'متن‌ها فعلاً نمونه هستند. ادامه دارد.',
    illustration: 'تصویر تزئینی · نمایی از گیم‌پلی نیست',
    gamePageDescription:
      'با Block Tower از استودیو جوجیک آشنا شوید. اطلاعات بازی، لینک‌های دانلود، حریم خصوصی و شرایط استفاده را اینجا پیدا کنید.',
    gameIntro: 'صفحه‌ای تازه در دنیای کوچک بازی‌های ما.',
    gameAboutTitle: 'با Block Tower آشنا شوید.',
    gameAboutDescription:
      'در این بخش، بازی و تجربه‌ای که در انتظارتان است معرفی خواهد شد. فعلاً تا آماده شدن جزئیات، این متن نمونه را اینجا گذاشته‌ایم.',
    downloadTitle: 'کمی بازی، به‌زودی.',
    comingSoon: 'لینک‌های دانلود به‌زودی اضافه می‌شوند',
    comingSoonDescription:
      'وقتی صفحه‌های فروشگاه آماده شوند، لینک‌هایشان را همین‌جا پیدا می‌کنید.',
    legalTitle: 'جزئیات هم مهم‌اند.',
    legalDescription:
      'اطلاعات حریم خصوصی و استفاده از Block Tower، به زبان شما.',
    privacy: 'حریم خصوصی',
    terms: 'شرایط استفاده',
    backToGame: 'بازگشت به Block Tower',
    effectiveDate: 'تاریخ اجرا',
    notFoundTitle: 'این گوشه هنوز خالی است.',
    notFoundDescription:
      'این صفحه را پیدا نکردیم. به استودیو برگردید و مسیرتان را از آنجا ادامه دهید.',
  },
};
