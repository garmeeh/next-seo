import React, { FC } from 'react';
import Head from 'next/head';

import markup from '../utils/markup';
import minifyJsonLd from '../utils/minifyJsonLd';
import formatAuthorName from '../utils/formatAuthorName';

export interface BlogJsonLdProps {
  keyOverride?: string;
  url: string;
  title: string;
  images: ReadonlyArray<string>;
  datePublished: string;
  dateModified: string;
  authorName: string | string[];
  description: string;
}

const BlogJsonLd: FC<BlogJsonLdProps> = ({
  keyOverride,
  url,
  title,
  images = [],
  datePublished,
  dateModified = null,
  authorName,
  description,
}) => {
  const jslonld = `{
    "@context": "http://schema.org",
    "@type": "Blog",
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
    "description": "${description}"
  }`;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={markup(minifyJsonLd(jslonld))}
        key={`jsonld-blog${keyOverride ? `-${keyOverride}` : ''}`}
      />
    </Head>
  );
};

export default BlogJsonLd;
