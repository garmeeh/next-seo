import React, { FC } from 'react';
import Head from 'next/head';

import markup from '../utils/markup';

export interface BlogJsonLdProps {
  url: string;
  title: string;
  images: ReadonlyArray<string>;
  datePublished: string;
  dateModified: string;
  authorName: string;
  description: string;
}

const BlogJsonLd: FC<BlogJsonLdProps> = ({
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
    "author": {
      "@type": "Person",
      "name": "${authorName}"
    },
    "description": "${description}"
  }`;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={markup(jslonld)}
        key="jsonld-blog"
      />
    </Head>
  );
};

export default BlogJsonLd;
