import { DefaultSeoProps } from '..';

const APP_DEFAULT_SEO: DefaultSeoProps = {
  title: 'Title A',
  titleTemplate: '%s | Next SEO',
  description: 'Description A',
  canonical: 'https://www.canonical.ie/a',
  defaultOpenGraphImageHeight: 1200,
  defaultOpenGraphImageWidth: 1200,
  mobileAlternate: {
    media: 'only screen and (max-width: 640px)',
    href: 'https://m.canonical.ie',
  },
  languageAlternates: [
    {
      hrefLang: 'de-AT',
      href: 'https://www.canonical.ie/de',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: 'https://www.test.ie/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: 'https://www.test.ie/touch-icon-ipad.jpg',
      sizes: '76x76',
    },
    {
      rel: 'apple-touch-icon',
      href: 'https://www.test.ie/touch-icon-iphone-retina.jpg',
      sizes: '120x120',
    },
    {
      rel: 'mask-icon',
      href: 'https://www.test.ie/safari-pinned-tab.svg',
      color: '#193860',
    },
    {
      rel: 'manifest',
      href: '/manifest.json',
    },
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://www.url.ie/a',
    title: 'Open Graph Title A',
    description: 'Open Graph Description A',
    // Multiple Open Graph images is only available in version `7.0.0-canary.0`+ of next
    images: [
      {
        url: 'https://www.test.ie/og-image-a-01.jpg',
        width: 800,
        height: 600,
        alt: 'Og Image Alt A',
        type: 'image/jpeg',
        secureUrl: 'https://www.test.ie/secure-og-image-a-01.jpg',
      },
    ],
    site_name: 'SiteName A',
  },
  twitter: {
    handle: '@handlea',
    site: '@sitea',
    cardType: 'summary_large_image',
  },
  facebook: {
    appId: '1234567890',
  },
};

export default APP_DEFAULT_SEO;
