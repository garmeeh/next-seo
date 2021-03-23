import React, { FC } from 'react';
import Head from 'next/head';

import markup from '../utils/markup';

export interface ProfilePageJsonLdProps {
  keyOverride?: string;
  breadcrumb: string | ItemListElements[];
  lastReviewed?: string;
}

export interface ItemListElements {
  item: string;
  name: string;
  position: number;
}

const buildBreadcrumb = (itemListElements: ItemListElements[]) => `{
  "@type": "BreadcrumbList",
  "itemListElement": ${buildBreadcrumbList(itemListElements)}
}`;

const buildBreadcrumbList = (itemListElements: ItemListElements[]) => `[
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
]`;

const ProfilePageJsonLd: FC<ProfilePageJsonLdProps> = ({
  keyOverride,
  breadcrumb,
  lastReviewed,
}) => {
  const jslonld = `{
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    ${lastReviewed ? `"lastReviewed": "${lastReviewed}",` : ''}
    "breadcrumb": ${
      typeof breadcrumb === 'string'
        ? `"${breadcrumb}"`
        : buildBreadcrumb(breadcrumb)
    }
  }`;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={markup(jslonld)}
        key={`jsonld-profile-page${keyOverride ? `-${keyOverride}` : ''}`}
      />
    </Head>
  );
};

export default ProfilePageJsonLd;
