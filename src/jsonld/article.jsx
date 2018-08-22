import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import markup from '../utils/markup';

const ArticleJsonLd = ({
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
    "author": {
      "@type": "Person",
      "name": "${authorName}"
    },
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
        dangerouslySetInnerHTML={markup(jslonld)}
        key="jsonld-article"
      />
    </Head>
  );
};

ArticleJsonLd.defaultProps = {
  dateModified: null,
};

ArticleJsonLd.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
  datePublished: PropTypes.string.isRequired,
  dateModified: PropTypes.string,
  authorName: PropTypes.string.isRequired,
  publisherName: PropTypes.string.isRequired,
  publisherLogo: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ArticleJsonLd;
