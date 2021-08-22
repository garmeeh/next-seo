import React, { FC } from 'react';
import Head from 'next/head';

import markup from '../utils/markup';
import { buildAuthor } from '../utils/buildArticle';

import { Author } from '../types';

export interface ArticleJsonLdProps {
  keyOverride?: string;
  url: string;
  title: string;
  images: ReadonlyArray<string>;
  datePublished: string;
  dateModified?: string;
  authorName: string | string[];
  author: Author | Author[];
  description: string;
  publisherName: string;
  publisherLogo: string;
}

const ArticleJsonLd: FC<ArticleJsonLdProps> = ({
  keyOverride,
  url,
  title,
  images = [],
  datePublished,
  dateModified = null,
  authorName,
  author,
  description,
  publisherName,
  publisherLogo,
}) => {
  const jslonld = JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url,
      },
      headline: title,
      image: images.map(image => image),
      datePublished: datePublished,
      dateModified: dateModified || datePublished,
      author: buildAuthor(author || authorName),
      publisher: {
        '@type': 'Organization',
        name: publisherName,
        logo: {
          '@type': 'ImageObject',
          url: publisherLogo,
        },
      },
      description: description,
    },
    null,
    2,
  );

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={markup(jslonld)}
        key={`jsonld-article${keyOverride ? `-${keyOverride}` : ''}`}
      />
    </Head>
  );
};

export default ArticleJsonLd;
