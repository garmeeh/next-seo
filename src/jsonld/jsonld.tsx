import React from 'react';
import Head from 'next/head';
import toJson from 'src/utils/toJson';

export interface JsonLdProps {
  type?: string;
  scriptId?: string;
  dataArray?: any[];
  useAppDir?: boolean;
  [key: string]: any;
}

const JsonLd: React.FC<JsonLdProps & { scriptKey: string }> = ({
  type = 'Thing',
  scriptId,
  dataArray,
  useAppDir = false,
  scriptKey,
  keyOverride,
  ...rest
}) => {
  const JsonLdScript = () => (
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
  );

  return useAppDir ? <JsonLdScript /> : <Head>{<JsonLdScript />}</Head>;
};

export { JsonLd };
