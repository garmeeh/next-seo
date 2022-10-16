import React from 'react';

import { JsonLd, JsonLdProps } from './jsonld';
import type { ContactPoint } from 'src/types';

import { setContactPoints } from 'src/utils/schema/setContactPoints';

export interface CorporateContactJsonLdProps extends JsonLdProps {
  url: string;
  contactPoint: ContactPoint[] | ContactPoint[];
  logo?: string;
}

function CorporateContactJsonLd({
  type = 'Organization',
  keyOverride,
  contactPoint,
  ...rest
}: CorporateContactJsonLdProps) {
  const data = {
    ...rest,
    contactPoint: contactPoint && setContactPoints(contactPoint),
  };
  return (
    <JsonLd
      type={type}
      keyOverride={keyOverride}
      {...data}
      scriptKey="CorporateContact"
    />
  );
}

export default CorporateContactJsonLd;
