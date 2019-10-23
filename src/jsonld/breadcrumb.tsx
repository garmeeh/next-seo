import React, { FC } from 'react';
import Head from 'next/head';

import markup from '../utils/markup';

export interface ItemListElements {
  item: string;
  name: string;
  position: number;
}
export interface BreadCrumbJsonLdProps {
  itemListElements: ItemListElements[];
}

const BreadCrumbJsonLd: FC<BreadCrumbJsonLdProps> = ({
  itemListElements = [],
}) => {
  const jslonld = `{
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      ${itemListElements.map(
        itemListElement => `{
        "@type": "ListItem",
        "position": ${itemListElement.position},
        "item": {
          "@id": "${itemListElement.item}",
          "name": "${itemListElement.name}"
        }
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
