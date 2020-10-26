import React, { FC } from 'react';
import Head from 'next/head';

import markup from '../utils/markup';
export interface ItemListElements {
  item: string;
  name: string;
  position: number;
}
export interface BreadCrumbJsonLdProps {
  keyOverride?: string;
  itemListElements: ItemListElements[];
}

const BreadCrumbJsonLd: FC<BreadCrumbJsonLdProps> = ({
  keyOverride,
  itemListElements = [],
}) => {
  const jslonld = `{
    "@context": "https://schema.org",
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
        key={`jsonld-breadcrumb${keyOverride ? `-${keyOverride}` : ''}`}
      />
    </Head>
  );
};

export default BreadCrumbJsonLd;
