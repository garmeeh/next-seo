import React from 'react';

import { JsonLd, JsonLdProps } from './jsonld';

export interface SocialProfileJsonLdProps extends JsonLdProps {
  type: 'Person' | 'Organization';
  name: string;
  url: string;
  sameAs: string[];
}

function SocialProfileJsonLd({
  type,
  keyOverride,
  ...rest
}: SocialProfileJsonLdProps) {
  return (
    <JsonLd
      type={type}
      keyOverride={keyOverride}
      {...rest}
      scriptKey="social"
    />
  );
}

export default SocialProfileJsonLd;
