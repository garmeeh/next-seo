import React, { FC } from 'react';
import Head from 'next/head';

import markup from '../utils/markup';

export interface LogoJsonLdProps {
  id?: string;
  logo: string;
  url: string;
}

const LogoJsonLd: FC<LogoJsonLdProps> = ({ id, url, logo }) => {
  const jslonld = `{
    "@context": "http://schema.org",
    "@type": "Organization",
    "url": "${url}",
    "logo": "${logo}"
  }`;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={markup(jslonld)}
        key={`jsonld-logo${id ? `-${id}` : ''}`}
      />
    </Head>
  );
};

export default LogoJsonLd;
