import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import markup from '../utils/markup';

const BreadCrumbJsonLd = ({ itemListElements = [] }) => {
  const jslonld = `{
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      ${itemListElements.map(
        itemListElement => `{
        "@type": "ListItem",
        "position": ${itemListElement.position},
        "name": "${itemListElement.name}",
        "item": "${itemListElement.item}"
      }`,
      )}
     ]
  }`;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={markup(jslonld)}
        key="jsonld-breadcrumb"
      />
    </Head>
  );
};

BreadCrumbJsonLd.propTypes = {
  itemListElements: PropTypes.arrayOf(
    PropTypes.shape({
      position: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      item: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default BreadCrumbJsonLd;
