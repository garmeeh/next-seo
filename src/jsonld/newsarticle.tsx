import React, { FC } from 'react';
import Head from 'next/head';

import markup from '../utils/markup';
import formatAuthorName from '../utils/formatAuthorName';

export interface NewsArticleJsonLdProps {
  keyOverride?: string;
  url: string;
  title: string;
  images: ReadonlyArray<string>;
  section: string;
  keywords: string;
  dateCreated: string;
  datePublished: string;
  dateModified?: string;
  authorName: string | string[];
  description: string;
  body: string;
  publisherName: string;
  publisherLogo: string;
}

const NewsArticleJsonLd: FC<NewsArticleJsonLdProps> = ({
  keyOverride,
  url,
  title,
  images = [],
  section,
  keywords,
  datePublished,
  dateCreated = null,
  dateModified = null,
  authorName,
  description,
  body,
  publisherName,
  publisherLogo,
}) => {
  const jslonld = `{
    "@context": "http://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "${url}"
    },
    "headline": "${title}",
    "image": [
      ${images.map(image => `"${image}"`)}
     ],
    "articleSection":"${section}",
    "keywords": "${keywords}",
    "datePublished": "${datePublished}",
    "dateCreated": "${dateCreated || datePublished}",
    "dateModified": "${dateModified || datePublished}",
    "author": ${formatAuthorName(authorName)},
    "publisher": {
      "@type": "Organization",
      "name": "${publisherName}",
      "logo": {
        "@type": "ImageObject",
        "url": "${publisherLogo}"
      }
    },
    "description": "${description}",
    "articleBody": "${body}"
  }`;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={markup(jslonld)}
        key={`jsonld-newsarticle${keyOverride ? `-${keyOverride}` : ''}`}
      />
    </Head>
  );
};

export default NewsArticleJsonLd;
