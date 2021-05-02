import React, { FC } from 'react';
import Head from 'next/head';

import escape from '../utils/escape';
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
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "${url}"
    },
    "headline": "${escape(title)}",
    "image": [
      ${images.map(image => `"${image}"`)}
    ],
    "articleSection":"${escape(section)}",
    "keywords": "${escape(keywords)}",
    "datePublished": "${datePublished}",
    "dateCreated": "${dateCreated || datePublished}",
    "dateModified": "${dateModified || datePublished}",
    "author": ${formatAuthorName(authorName)},
    "publisher": {
      "@type": "Organization",
      "name": "${escape(publisherName)}",
      "logo": {
        "@type": "ImageObject",
        "url": "${publisherLogo}"
      }
    },
    "description": "${escape(description)}",
    "articleBody": "${escape(body)}"
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
