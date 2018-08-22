import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import markup from '../utils/markup';

const BlogJsonLd = ({
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

BlogJsonLd.defaultProps = {
  dateModified: null,
};

BlogJsonLd.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
  datePublished: PropTypes.string.isRequired,
  dateModified: PropTypes.string,
  authorName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default BlogJsonLd;
