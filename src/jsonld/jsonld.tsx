import React from 'react';
import Head from 'next/head';

import toJson from 'src/utils/toJson';

export interface JsonLdProps {
  type?: string;
  scriptId?: string;
  [key: string]: any;
}

function JsonLd({
  type = 'Thing',
  keyOverride,
  scriptKey,
  scriptId = undefined,
  ...rest
}: JsonLdProps & { scriptKey: string }) {
  return (
    <Head>
      <script
        type="application/ld+json"
        id={scriptId}
        data-testid={scriptId}
        dangerouslySetInnerHTML={toJson(type, { ...rest })}
        key={`jsonld-${scriptKey}${keyOverride ? `-${keyOverride}` : ''}`}
      />
    </Head>
  );
}

export { JsonLd };
