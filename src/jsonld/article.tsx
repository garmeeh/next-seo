import React, { FC } from 'react';
import Head from 'next/head';

import markup from '../utils/markup';
import minifyJsonLd from '../utils/minifyJsonLd';
import formatAuthorName from '../utils/formatAuthorName';

export interface ArticleJsonLdProps {
  keyOverride?: string;
  url: string;
  title: string;
  images: ReadonlyArray<string>;
  datePublished: string;
  dateModified?: string;
  authorName: string | string[];
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
  description,
  publisherName,
  publisherLogo,
}) => {
  const jslonld = `{
    "@context": "http://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "${url}"
    },
    "headline": "${title}",
    "image": [
      ${images.map(image => `"${image}"`)}
     ],
    "datePublished": "${datePublished}",
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
    "description": "${description}"
  }`;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={markup(minifyJsonLd(jslonld))}
        key={`jsonld-article${keyOverride ? `-${keyOverride}` : ''}`}
      />
    </Head>
  );
};

export default ArticleJsonLd;
