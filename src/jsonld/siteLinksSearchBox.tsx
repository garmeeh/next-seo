import React, { FC } from 'react';
import Head from 'next/head';

import markup from '../utils/markup';
export interface PotentialAction {
  target: string;
  queryInput: string;
}
export interface SiteLinksSearchBoxJsonLdProps {
  keyOverride?: string;
  url: string;
  potentialActions: PotentialAction[];
}

const SiteLinksSearchBoxJsonLd: FC<SiteLinksSearchBoxJsonLdProps> = ({
  keyOverride,
  url,
  potentialActions = [],
}) => {
  const jslonld = `{
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "${url}",
    "potentialAction": [
      ${potentialActions.map(
        ({ target, queryInput }) => `{
        "@type": "SearchAction",
        "target": "${target}={${queryInput}}",
        "query-input": "required name=${queryInput}"
      }`,
      )}
     ]
  }`;
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={markup(jslonld)}
        key={`jsonld-siteLinksSearchBox${keyOverride ? `-${keyOverride}` : ''}`}
      />
    </Head>
  );
};

export default SiteLinksSearchBoxJsonLd;
