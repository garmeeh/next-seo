import React from 'react';
import { NextSeo } from '../..';
import Links from '../components/links';

export default () => (
  <>
    <NextSeo
      noindex={true}
      nofollow={true}
      title="Title B"
      description="Description B"
      canonical="https://www.canonical.ie/b"
      languageAlternates={[
        {
          hrefLang: 'de-AT',
          href: 'https://www.canonical.ie/de',
        },
      ]}
      mobileAlternate={{
        media: 'only screen and (max-width: 640px)',
        href: 'https://m.canonical.ie',
      }}
      openGraph={{
        url: 'https://www.url.ie/b',
        title: 'Open Graph Title B',
        description: 'Open Graph Description B',
        // Multiple Open Graph images is only available in version `7.0.0-canary.0`+ of next
        images: [
          {
            url: 'https://www.test.ie/og-image-b-01.jpg',
            width: 850,
            height: 650,
            alt: 'Og Image Alt B',
          },
          {
            url: 'https://www.test.ie/og-image-b-02.jpg',
            width: 950,
            height: 850,
            alt: 'Og Image Alt B Second',
          },
          { url: 'https://www.test.ie/og-image-b-03.jpg' },
          { url: 'https://www.test.ie/og-image-b-04.jpg' },
        ],
        videos: [
          {
            url: 'https://www.test.ie/og-video-b-01.jpg',
            width: 850,
            height: 650,
            alt: 'Og Video Alt B',
          },
          {
            url: 'https://www.test.ie/og-video-b-02.jpg',
            width: 950,
            height: 850,
            alt: 'Og Video Alt B Second',
          },
          { url: 'https://www.test.ie/og-video-b-03.jpg' },
          { url: 'https://www.test.ie/og-video-b-04.jpg' },
        ],
        site_name: 'SiteName B',
      }}
      twitter={{
        handle: '@handleb',
        site: '@siteb',
        cardType: 'summary_large_image',
      }}
      facebook={{
        appId: '987654321',
      }}
      additionalMetaTags={[
        {
          property: 'dc:creator',
          content: 'Jane Doe',
        },
        {
          name: 'application-name',
          content: 'NextSeo',
        },
        {
          httpEquiv: 'x-ua-compatible',
          content: 'IE=edge; chrome=1',
        },
      ]}
    />
    <h1>Overridden Seo</h1>
    <Links />
  </>
);
