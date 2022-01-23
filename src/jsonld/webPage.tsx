import React from 'react';

import { JsonLd } from './jsonld';

export interface WebPageJsonLdProps {
  keyOverride?: string;
  id: string;
  description?: string;
  lastReviewed?: string;
  reviewedBy?: {
    type?: string;
    name: string;
  };
}

function WebPageJsonLd({
  keyOverride,
  reviewedBy,
  ...rest
}: WebPageJsonLdProps) {
  return (
    <JsonLd
      keyOverride={keyOverride}
      {...rest}
      reviewedBy={{
        '@type': reviewedBy?.type || 'Organization',
        ...reviewedBy,
      }}
      type="WebPage"
      scriptKey="WebPage"
    />
  );
}

export default WebPageJsonLd;
