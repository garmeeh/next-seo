import React from 'react';
import Head from 'next/head';

import toJson from '../utils/toJson';

export interface SocialProfileJsonLdProps {
  keyOverride?: string;
  type: 'Person' | 'Organization';
  name: string;
  url: string;
  sameAs: string[];
}

function SocialProfileJsonLd({
  type,
  keyOverride,
  ...rest
}: SocialProfileJsonLdProps) {
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={toJson(type, { ...rest })}
        key={`jsonld-social${keyOverride ? `-${keyOverride}` : ''}`}
      />
    </Head>
  );
}

export default SocialProfileJsonLd;
