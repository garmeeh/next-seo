import React, { FC } from 'react';
import Head from 'next/head';

import markup from '../utils/markup';

export interface WebPageJsonLdProps {
  id: string;
  description?: string;
  lastReviewed?: string;
  reviewedBy?: {
    type?: string;
    name: string;
  };
}

const WebPageJsonLd: FC<WebPageJsonLdProps> = ({
  id,
  description,
  lastReviewed,
  reviewedBy,
}) => {
  const jslonld = `{
    "@context": "https://schema.org",
    "@type": "WebPage",
    ${description ? `"description": "${description}",` : ''}
    ${lastReviewed ? `"lastReviewed": "${lastReviewed}",` : ''}
    ${
      reviewedBy
        ? `"reviewedBy": {
        "@type": "${reviewedBy.type || 'Organization'}",
        "name": "${reviewedBy.name}"
    },`
        : ''
    }
    "@id": "${id}"
    }`;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={markup(jslonld)}
        key="jsonld-webpage"
      />
    </Head>
  );
};

export default WebPageJsonLd;
