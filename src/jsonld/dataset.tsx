import React, { FC } from 'react';
import Head from 'next/head';

import escape from '../utils/escape';
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
    "@context": "https://schema.org",
    "@type": "Dataset",
    "description": "${escape(description)}",
    "name": "${escape(name)}"${
    license
      ? `,
        "license": "${escape(license)}"`
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
