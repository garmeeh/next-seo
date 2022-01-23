import React from 'react';

import { JsonLd, JsonLdProps } from './jsonld';

export interface DatasetJsonLdProps extends JsonLdProps {
  description: string;
  name: string;
  license?: string;
}

function DatasetJsonLd({
  type = 'Dataset',
  keyOverride,
  ...rest
}: DatasetJsonLdProps) {
  return (
    <JsonLd
      type={type}
      keyOverride={keyOverride}
      {...rest}
      scriptKey="dataset"
    />
  );
}

export default DatasetJsonLd;
