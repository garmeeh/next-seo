import React, { FC } from 'react';
import Head from 'next/head';

import markup from '../utils/markup';
export interface SocialProfileJsonLdProps {
  keyOverride?: string;
  type: string;
  name: string;
  url: string;
  sameAs: string[];
}

const SocialProfileJsonLd: FC<SocialProfileJsonLdProps> = ({
  keyOverride,
  type,
  name,
  url,
  sameAs = [],
}) => {
  const jslonld = `{
    "@context": "https://schema.org",
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
        key={`jsonld-social${keyOverride ? `-${keyOverride}` : ''}`}
      />
    </Head>
  );
};

export default SocialProfileJsonLd;
