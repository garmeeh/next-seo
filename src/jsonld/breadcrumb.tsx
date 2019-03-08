import React from 'react';
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

export default BreadCrumbJsonLd;
