import React from 'react';
import NextSeo from '../../dist';
import Links from '../components/links';

export default () => (
  <>
    <NextSeo
      config={{
        title: 'Article Page Title',
        description: 'Description of article page',
        openGraph: {
          title: 'Open Graph Article Title',
          description: 'Description of open graph article',
          url: 'https://www.example.com/articles/article-title',
          type: 'article',
          article: {
            publishedTime: '2017-06-21T23:04:13Z',
            modifiedTime: '2018-01-21T18:04:43Z',
            expirationTime: '2022-12-21T22:04:11Z',
            // Multiple Open Graph authors is only available in version `7.0.2-canary.35`+ of next
            authors: [
              'https://www.example.com/authors/@firstnameA-lastnameA',
              'https://www.example.com/authors/@firstnameB-lastnameB',
            ],
            section: 'Section II',
            // Multiple Open Graph tags is only available in version `7.0.2-canary.35`+ of next
            tags: ['Tag A', 'Tag B', 'Tag C'],
          },
          // Multiple Open Graph images is only available in version `7.0.0-canary.0`+ of next
          images: [
            {
              url: 'https://www.test.ie/og-image-article-title-01.jpg',
              width: 850,
              height: 650,
              alt: 'Og Image Alt Article Title A',
            },
            {
              url: 'https://www.test.ie/og-image-article-title-02.jpg',
              width: 950,
              height: 850,
              alt: 'Og Image Alt Article Title B',
            },
            {
              url: 'https://www.test.ie/og-image-article-title-03.jpg',
              width: 600,
              height: 400,
              alt: 'Og Image Alt Article Title C',
            },
            {
              url: 'https://www.test.ie/og-image-article-title-04.jpg',
              width: 400,
              height: 400,
              alt: 'Og Image Alt Article Title D',
            },
          ],
          site_name: 'SiteName',
        },
        twitter: {
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        },
      }}
    />
    <h1>Article Page SEO</h1>
    <Links />
  </>
);
