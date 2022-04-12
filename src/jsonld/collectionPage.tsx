import React from 'react';

import { JsonLd, JsonLdProps } from './jsonld';
import type { CreativeWork } from '../types';
import { setCreativeWork } from '../utils/schema/setCreativeWork';

export interface CollectionPageJsonLdProps extends JsonLdProps {
  name: string;
  hasPart: CreativeWork[];
}

function CollectionPageJsonLd({
  type = 'CollectionPage',
  keyOverride,
  hasPart,
  ...rest
}: CollectionPageJsonLdProps) {
  const data = {
    ...rest,
    hasPart: hasPart.map(setCreativeWork),
  };
  return (
    <JsonLd
      type={type}
      keyOverride={keyOverride}
      {...data}
      scriptKey="CollectionPage"
    />
  );
}

export default CollectionPageJsonLd;
