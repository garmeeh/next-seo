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
  /**
   * @deprecated please use contactPoint instead. contactPoints will continue to work until next major release.
   */
  contactPoints?: ContactPoint[];
  contactPoint?: ContactPoint[];
}

function OrganizationJsonLd({
  type = 'Organization',
  keyOverride,
  address,
  contactPoints,
  contactPoint,
  ...rest
}: OrganizationJsonLdProps) {
  const data = {
    ...rest,
    address: setAddress(address),
    contactPoint: setContactPoints(contactPoint || contactPoints),
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
