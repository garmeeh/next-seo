import React, { FC } from 'react';
import Head from 'next/head';

import markup from '../utils/markup';
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
        dangerouslySetInnerHTML={markup(jslonld)}
        key="jsonld-dataset"
      />
    </Head>
  );
};

export default DatasetJsonLd;
