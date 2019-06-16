import React, { FC } from 'react';
import Head from 'next/head';

import markup from '../utils/markup';

export interface SocialProfileJsonLdProps {
  type: string;
  name: string;
  url: string;
  sameAs: string[];
}

const SocialProfileJsonLd: FC<SocialProfileJsonLdProps> = ({
  type,
  name,
  url,
  sameAs = [],
}) => {
  const jslonld = `{
    "@context": "http://schema.org",
    "@type": "${type}",
    "name": "${name}",
    "url": "${url}",
    "sameAs": [
      ${sameAs.map(socialUrl => `"${socialUrl}"`)}
     ]
  }`;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={markup(jslonld)}
        key="jsonld-social"
      />
    </Head>
  );
};

export default SocialProfileJsonLd;
