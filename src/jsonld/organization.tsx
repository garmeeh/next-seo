import React from 'react';
import Head from 'next/head';

import markup from '../utils/markup';
import { Address, OrganizationCategory } from '../types';
import { buildContactPoint, ContactPoint } from './corporateContact';
import buildAddress from '../utils/buildAddress';

export interface OrganizationJsonLdProps {
  organizationType?: OrganizationCategory;
  id?: string;
  name: string;
  logo?: string;
  url: string;
  legalName?: string;
  sameAs?: string[];
  address?: Address;
  contactPoints?: ContactPoint[];
}

const OrganizationJsonLd: React.FC<OrganizationJsonLdProps> = ({
  organizationType = 'Organization',
  id,
  name,
  logo,
  url,
  legalName,
  sameAs = [],
  address,
  contactPoints = [],
}) => {
  const jslonld = `{
    "@context": "https://schema.org",
    "@type": "${organizationType}",
    ${id ? `"@id": "${id}",` : ''}
    ${logo ? `"logo": "${logo}",` : ''}
    ${legalName ? `"legalName": "${legalName}",` : ''}
    "name": "${name}",
    ${address ? buildAddress(address) : ''}
    ${
      sameAs.length > 0
        ? `"sameAs": [${sameAs.map(alias => `"${alias}"`).join(',')}],`
        : ''
    }
    ${
      contactPoints.length > 0
        ? `"contactPoints": [${buildContactPoint(contactPoints)}],`
        : ''
    }
    "url": "${url}"
  }`;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={markup(jslonld)}
        key="jsonld-organization-page"
      />
    </Head>
  );
};

export default OrganizationJsonLd;
