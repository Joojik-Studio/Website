export interface StoreLink {
  label: { fa: string; en: string };
  url: `https://${string}`;
}

export const blockTower = {
  slug: 'block-tower',
  name: 'Block Tower',
  theme: { accent: '#4B4FD8', surface: '#EEEDFF' },
  // Add only real store URLs. Empty means the localized coming-soon message.
  stores: [] as StoreLink[],
};
