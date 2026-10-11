import privacyPolicy from '@/content/games/block-tower/privacy-policy.json';
import termsOfService from '@/content/games/block-tower/terms-of-service.json';
import type { LegalKind, Locale } from '@/i18n';

interface LegalDocument {
  effectiveDate: string;
  locales: Record<
    Locale,
    {
      title: string;
      introduction: string[];
      sections: {
        id: string;
        title: string;
        paragraphs: string[];
        bullets: string[];
      }[];
    }
  >;
}

export const legalDocuments: Record<LegalKind, LegalDocument> = {
  'privacy-policy': privacyPolicy,
  'terms-of-service': termsOfService,
};
