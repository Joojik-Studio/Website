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

interface LegalSection {
  heading: string;
  body: string;
}
interface LegalContent {
  title: string;
  description: string;
  intro: string;
  sections: LegalSection[];
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
  draftTitle: string;
  draftDescription: string;
  notFoundTitle: string;
  notFoundDescription: string;
  legal: Record<LegalKind, LegalContent>;
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
    draftTitle: 'Sample document',
    draftDescription:
      'This text is a layout preview. It is not the final privacy policy or terms of service for Block Tower.',
    notFoundTitle: 'This little corner is empty.',
    notFoundDescription:
      'We couldn’t find that page. Head back to the studio and find your way from there.',
    legal: {
      'privacy-policy': {
        title: 'Privacy policy',
        description:
          'Sample privacy policy page for Block Tower by Joojik Studio.',
        intro:
          'This page will explain how information is handled in connection with Block Tower. The sections below are placeholders for the final policy.',
        sections: [
          {
            heading: 'Information and its use',
            body: 'The final policy will describe any information handled by the game, why it is needed, and how it is used. These details will be added after the game’s services and integrations are confirmed.',
          },
          {
            heading: 'Services and storage',
            body: 'This section will identify any relevant third-party services and explain applicable storage and retention practices. It does not currently describe the game’s actual data practices.',
          },
          {
            heading: 'Your questions',
            body: 'Privacy questions, available choices, and the appropriate contact information will be explained here in the final version.',
          },
          {
            heading: 'Updates to this page',
            body: 'When the final policy is published, this section will explain how changes are communicated and display the effective date.',
          },
        ],
      },
      'terms-of-service': {
        title: 'Terms of service',
        description:
          'Sample terms of service page for Block Tower by Joojik Studio.',
        intro:
          'This page will describe the terms that apply to using Block Tower. The text below is a structural example, rather than an agreement ready for use.',
        sections: [
          {
            heading: 'Using the game',
            body: 'The final terms will explain the conditions for accessing and using the game. Any applicable eligibility requirements and player responsibilities will be set out here.',
          },
          {
            heading: 'Game content',
            body: 'This section will describe rights relating to the game’s content and any permissions or restrictions that apply. The wording will be completed for the released game.',
          },
          {
            heading: 'Availability and changes',
            body: 'The final document will explain relevant service conditions, updates, and changes. This sample does not promise any particular availability or feature.',
          },
          {
            heading: 'Questions about these terms',
            body: 'Contact details, applicable provisions, and an effective date will be added when the final terms are prepared.',
          },
        ],
      },
    },
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
    draftTitle: 'سند نمونه',
    draftDescription:
      'این متن فقط پیش‌نمایش صفحه است و سیاست حریم خصوصی یا شرایط استفادهٔ نهایی Block Tower نیست.',
    notFoundTitle: 'این گوشه هنوز خالی است.',
    notFoundDescription:
      'این صفحه را پیدا نکردیم. به استودیو برگردید و مسیرتان را از آنجا ادامه دهید.',
    legal: {
      'privacy-policy': {
        title: 'حریم خصوصی',
        description:
          'صفحهٔ نمونهٔ حریم خصوصی بازی Block Tower از استودیو جوجیک.',
        intro:
          'این صفحه توضیح خواهد داد که اطلاعات مرتبط با Block Tower چگونه مدیریت می‌شوند. بخش‌های زیر جای نگهدارندهٔ متن نهایی هستند.',
        sections: [
          {
            heading: 'اطلاعات و کاربرد آن‌ها',
            body: 'در نسخهٔ نهایی، اطلاعاتی که بازی مدیریت می‌کند، دلیل نیاز به آن‌ها و شیوهٔ استفاده از آن‌ها توضیح داده خواهد شد. این جزئیات پس از مشخص شدن سرویس‌ها و یکپارچه‌سازی‌های بازی اضافه می‌شوند.',
          },
          {
            heading: 'سرویس‌ها و نگهداری اطلاعات',
            body: 'این بخش، سرویس‌های شخص ثالث مرتبط و روش‌های ذخیره و نگهداری اطلاعات را معرفی خواهد کرد. متن فعلی بیانگر شیوهٔ واقعی مدیریت داده در بازی نیست.',
          },
          {
            heading: 'پرسش‌های شما',
            body: 'در نسخهٔ نهایی، راه طرح پرسش‌های مربوط به حریم خصوصی، انتخاب‌های در دسترس و اطلاعات تماس مناسب در این بخش توضیح داده می‌شود.',
          },
          {
            heading: 'به‌روزرسانی این صفحه',
            body: 'هنگام انتشار سیاست نهایی، در این بخش نحوهٔ اطلاع‌رسانی تغییرات و تاریخ اجرای آن مشخص خواهد شد.',
          },
        ],
      },
      'terms-of-service': {
        title: 'شرایط استفاده',
        description:
          'صفحهٔ نمونهٔ شرایط استفاده از بازی Block Tower استودیو جوجیک.',
        intro:
          'این صفحه شرایط استفاده از Block Tower را توضیح خواهد داد. متن زیر نمونه‌ای از ساختار سند است و توافق‌نامهٔ آمادهٔ استفاده نیست.',
        sections: [
          {
            heading: 'استفاده از بازی',
            body: 'شرایط نهایی، ضوابط دسترسی و استفاده از بازی را توضیح خواهد داد. هرگونه شرط لازم برای استفاده و مسئولیت‌های بازیکنان در این بخش مشخص می‌شود.',
          },
          {
            heading: 'محتوای بازی',
            body: 'در این بخش حقوق مرتبط با محتوای بازی و مجوزها یا محدودیت‌های مربوط توضیح داده خواهد شد. متن آن برای نسخهٔ منتشرشدهٔ بازی تکمیل می‌شود.',
          },
          {
            heading: 'دسترسی و تغییرات',
            body: 'سند نهایی، شرایط مرتبط با سرویس، به‌روزرسانی‌ها و تغییرات را شرح خواهد داد. این نمونه، دسترسی یا ویژگی خاصی را وعده نمی‌دهد.',
          },
          {
            heading: 'پرسش دربارهٔ این شرایط',
            body: 'هنگام آماده شدن شرایط نهایی، اطلاعات تماس، مقررات مربوط و تاریخ اجرا در این بخش اضافه خواهد شد.',
          },
        ],
      },
    },
  },
};
