import { getByText, render } from 'react-testing-library';
import React from 'react';

import buildTags from '../buildTags';

const SEO = {
  title: 'This is a test title.',
  description: 'This is a test description.',
  canonical: 'https://www.canonical.ie',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://www.url.ie',
    title: 'Open graph title',
    description: 'This is testing og:description.',
    defaultImageWidth: 1200,
    defaultImageHeight: 1200,
    images: [
      {
        url: 'https://www.test.ie/image-01.jpg',
        width: 800,
        height: 600,
        alt: 'Alt text right here',
      },
      { url: 'https://www.test.ie/image-02.jpg' },
      { url: 'https://www.test.ie/image-03.jpg' },
      { url: 'https://www.test.ie/image-04.jpg' },
    ],
    site_name: 'SiteName',
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
};

it('renders correctly', () => {
  const tags = buildTags(SEO);
  const { container } = render(tags);

  expect(container).toMatchSnapshot();
});

/* eslint no-magic-numbers: 0 */
it('returns full array for default seo object', () => {
  const tags = buildTags(SEO);
  const { container } = render(tags);

  const title = getByText(
    container,
    (content, element) => element.tagName.toLowerCase() === 'title' && content.startsWith(`${SEO.title}`),
  );
  const index = container.querySelectorAll('meta[content="index,follow"]');
  const description = container.querySelectorAll(`meta[content="${SEO.description}"]`);
  const descriptionTag = container.querySelectorAll('meta[name="description"]');
  const twitterCard = container.querySelectorAll('meta[content="summary_large_image"]');
  const twitterCardTag = container.querySelectorAll('meta[name="twitter:card"]');
  const twitterHandle = container.querySelectorAll(`meta[content="${SEO.twitter.handle}"]`);
  const twitterHandleTag = container.querySelectorAll('meta[name="twitter:creator"]');
  const twitterSite = container.querySelectorAll(`meta[content="${SEO.twitter.site}"]`);
  const twitterSiteTag = container.querySelectorAll('meta[name="twitter:site"]');
  const ogUrl = container.querySelectorAll(`meta[content="${SEO.openGraph.url}"]`);
  const ogUrlTag = container.querySelectorAll('meta[property="og:url"]');
  const ogType = container.querySelectorAll(`meta[content="${SEO.openGraph.type}"]`);
  const ogTypeTag = container.querySelectorAll('meta[property="og:type"]');
  const ogTitle = container.querySelectorAll(`meta[content="${SEO.openGraph.title}"]`);
  const ogTitleTag = container.querySelectorAll('meta[property="og:title"]');
  const ogDescription = container.querySelectorAll(`meta[content="${SEO.openGraph.description}"]`);
  const ogDescriptionTag = container.querySelectorAll('meta[property="og:description"]');
  const ogImage00 = container.querySelectorAll(`meta[content="${SEO.openGraph.images[0].url}"]`);
  const ogImageTag00 = tags.filter(item => item.key === 'og:image:01');
  const ogImage01 = container.querySelectorAll(`meta[content="${SEO.openGraph.images[1].url}"]`);
  const ogImageTag01 = tags.filter(item => item.key === 'og:image:01');
  const ogImage02 = container.querySelectorAll(`meta[content="${SEO.openGraph.images[2].url}"]`);
  const ogImageTag02 = tags.filter(item => item.key === 'og:image:02');
  const ogImage03 = container.querySelectorAll(`meta[content="${SEO.openGraph.images[3].url}"]`);
  const ogImageTag03 = tags.filter(item => item.key === 'og:image:03');
  const ogDefaultImageWidthHeight = container.querySelectorAll(
    `meta[content="${SEO.openGraph.defaultImageHeight}"]`,
  );
  const ogSetImageHeight = container.querySelectorAll(
    `meta[content="${SEO.openGraph.images[0].height}"]`,
  );
  const ogSetImageWidth = container.querySelectorAll(
    `meta[content="${SEO.openGraph.images[0].width}"]`,
  );
  const ogSetImageAlt = container.querySelectorAll(
    `meta[content="${SEO.openGraph.images[0].alt}"]`,
  );
  const ogLocale = container.querySelectorAll(`meta[content="${SEO.openGraph.locale}"]`);
  const ogLocaleTag = tags.filter(item => item.key === 'og:locale');
  const canonicalTag = tags.filter(item => item.key === 'canonical');

  expect(title).toBeDefined();
  expect(Array.from(index).length).toBe(2);
  expect(Array.from(description).length).toBe(1);
  expect(Array.from(descriptionTag).length).toBe(1);
  expect(Array.from(twitterCard).length).toBe(1);
  expect(Array.from(twitterCardTag).length).toBe(1);
  expect(Array.from(twitterHandle).length).toBe(1);
  expect(Array.from(twitterHandleTag).length).toBe(1);
  expect(Array.from(twitterSite).length).toBe(1);
  expect(Array.from(twitterSiteTag).length).toBe(1);
  expect(Array.from(ogUrl).length).toBe(1);
  expect(Array.from(ogUrlTag).length).toBe(1);
  expect(Array.from(ogType).length).toBe(1);
  expect(Array.from(ogTypeTag).length).toBe(1);
  expect(Array.from(ogTitle).length).toBe(1);
  expect(Array.from(ogTitleTag).length).toBe(1);
  expect(Array.from(ogDescription).length).toBe(1);
  expect(Array.from(ogDescriptionTag).length).toBe(1);
  expect(Array.from(ogImage00).length).toBe(1);
  expect(Array.from(ogImageTag00).length).toBe(1);
  expect(Array.from(ogImage01).length).toBe(1);
  expect(Array.from(ogImageTag01).length).toBe(1);
  expect(Array.from(ogImage02).length).toBe(1);
  expect(Array.from(ogImageTag02).length).toBe(1);
  expect(Array.from(ogImage03).length).toBe(1);
  expect(Array.from(ogImageTag03).length).toBe(1);
  expect(Array.from(ogDefaultImageWidthHeight).length).toBe(6);
  expect(Array.from(ogSetImageHeight).length).toBe(1);
  expect(Array.from(ogSetImageWidth).length).toBe(1);
  expect(Array.from(ogSetImageAlt).length).toBe(1);
  expect(Array.from(ogLocale).length).toBe(1);
  expect(Array.from(ogLocaleTag).length).toBe(1);
  expect(canonicalTag[0].props.href).toBe(`${SEO.canonical}`);
  expect(Array.from(canonicalTag).length).toBe(1);
});

it('correctly sets noindex, nofollow', () => {
  const overrideProps = {
    ...SEO,
    noindex: true,
  };
  const tags = buildTags(overrideProps);
  const { container } = render(tags);
  const index = container.querySelectorAll('meta[content="index,follow"]');
  const noindex = container.querySelectorAll('meta[content="noindex,nofollow"]');

  expect(Array.from(index).length).toBe(0);
  expect(Array.from(noindex).length).toBe(2);
});
