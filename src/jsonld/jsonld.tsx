import React from 'react';
import Head from 'next/head';

import toJson from 'src/utils/toJson';

export interface JsonLdProps {
  type?: string;
  scriptId?: string;
  dataArray?: any[];
  [key: string]: any;
}

function JsonLd({
  type = 'Thing',
  keyOverride,
  scriptKey,
  scriptId = undefined,
  dataArray,
  ...rest
}: JsonLdProps & { scriptKey: string }) {
  return (
    <Head>
      <script
        type="application/ld+json"
        id={scriptId}
        data-testid={scriptId}
        dangerouslySetInnerHTML={toJson(
          type,
          dataArray === undefined ? { ...rest } : dataArray,
        )}
        key={`jsonld-${scriptKey}${keyOverride ? `-${keyOverride}` : ''}`}
      />
    </Head>
  );
}

export { JsonLd };
