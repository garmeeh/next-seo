import React from 'react';

import { JsonLd, JsonLdProps } from './jsonld';
import type { ContactPoint } from '../types';

import { setContactPoint } from '../utils/schema/setContactPoint';

export interface CorporateContactJsonLdProps extends JsonLdProps {
  url: string;
  contactPoint: ContactPoint[];
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
    contactPoint: contactPoint.map(setContactPoint),
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
