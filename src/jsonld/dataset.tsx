import React, { FC } from 'react';
import Head from 'next/head';

import markup from '../utils/markup';
import minifyJsonLd from '../utils/minifyJsonLd';

export interface DatasetJsonLdProps {
  description: string;
  name: string;
  license?: string;
}

const DatasetJsonLd: FC<DatasetJsonLdProps> = ({
  description,
  name,
  license,
}) => {
  const jslonld = `{
    "@context": "http://schema.org",
    "@type": "Dataset",
    "description": "${description}",
    "name": "${name}"${
    license
      ? `,
        "license": "${license}"`
      : ''
  }
  }`;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={markup(minifyJsonLd(jslonld))}
        key="jsonld-dataset"
      />
    </Head>
  );
};

export default DatasetJsonLd;
