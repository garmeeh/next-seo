import React, { FC } from 'react';
import Head from 'next/head';

import markup from '../utils/markup';

export interface ImageJsonLdProps {
  url: string;
  license: string;
  acquireLicensePage: string;
}

const ImageJsonLd: FC<ImageJsonLdProps> = ({ url, license, acquireLicensePage }) => {
  const jslonld = `{
    "@context": "http://schema.org",
    "@type": "ImageObject",
    "url": "${url}",
    "license": "${license}",
    "acquireLicensePage": "${acquireLicensePage}"
  }`;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={markup(jslonld)}
        key="jsonld-image"
      />
    </Head>
  );
};

export default ImageJsonLd;