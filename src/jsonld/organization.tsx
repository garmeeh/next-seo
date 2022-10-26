import React from 'react';

import type { Address, OrganizationCategory, ContactPoint } from 'src/types';
import { JsonLd, JsonLdProps } from './jsonld';
import { setAddress } from 'src/utils/schema/setAddress';
import { setContactPoints } from 'src/utils/schema/setContactPoints';

export interface OrganizationJsonLdProps extends JsonLdProps {
  type?: OrganizationCategory;
  id?: string;
  name: string;
  logo?: string;
  url: string;
  legalName?: string;
  sameAs?: string[];
  address?: Address | Address[];
  contactPoints?: ContactPoint[];
}

function OrganizationJsonLd({
  type = 'Organization',
  keyOverride,
  address,
  contactPoints,
  ...rest
}: OrganizationJsonLdProps) {
  const data = {
    ...rest,
    address: setAddress(address),
    contactPoints: setContactPoints(contactPoints),
  };
  return (
    <JsonLd
      type={type}
      keyOverride={keyOverride}
      {...data}
      scriptKey="organization"
    />
  );
}

export default OrganizationJsonLd;
