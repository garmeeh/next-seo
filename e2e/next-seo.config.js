export default {
  title: 'Title A',
  description: 'Description A',
  canonical: 'https://www.canonical.ie/a',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://www.url.ie/a',
    title: 'Open Graph Title A',
    description: 'Open Graph Description A',
    defaultImageWidth: 1200,
    defaultImageHeight: 1200,
    // Multiple Open Graph images is only available in version `7.0.0-canary.0`+ of next
    images: [
      {
        url: 'https://www.test.ie/og-image-a-01.jpg',
        width: 800,
        height: 600,
        alt: 'Og Image Alt A',
      },
      {
        url: 'https://www.test.ie/og-image-a-02.jpg',
        width: 900,
        height: 800,
        alt: 'Og Image Alt A Second',
      },
      { url: 'https://www.test.ie/og-image-a-03.jpg' },
      { url: 'https://www.test.ie/og-image-a-04.jpg' },
    ],
    site_name: 'SiteName A',
  },
  twitter: {
    handle: '@handlea',
    site: '@sitea',
    cardType: 'summary_large_image',
  },
};
