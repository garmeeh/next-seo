import React, { FC } from 'react';
import Head from 'next/head';

import markup from '../utils/markup';
import formatIfArray from '../utils/formatIfArray';

type Address = {
  streetAddress: string;
  addressLocality: string;
  addressRegion?: string;
  postalCode: string;
  addressCountry: string;
};

type Geo = {
  latitude: string;
  longitude: string;
};

type Rating = {
  ratingValue: string;
  ratingCount: string;
};

export interface LocalBusinessJsonLdProps {
  type: string;
  id: string;
  name: string;
  description: string;
  url: string;
  telephone?: string;
  address: Address;
  geo: Geo;
  images: string[];
  rating?: Rating;
  priceRange?: string;
}

const buildGeo = (geo: Geo) => `
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "${geo.latitude}",
    "longitude": "${geo.longitude}"
  },
`;

const buildAddress = (address: Address) => `
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "${address.streetAddress}",
    "addressLocality": "${address.addressLocality}",
    ${
      address.addressRegion
        ? `"addressRegion": "${address.addressRegion}",`
        : ''
    }
    "postalCode": "${address.postalCode}",
    "addressCountry": "${address.addressCountry}"
  },
`;

const buildRating = (rating: Rating) => `
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "${rating.ratingValue}",
    "ratingCount": "${rating.ratingCount}"
  },
`;

const LocalBusinessJsonLd: FC<LocalBusinessJsonLdProps> = ({
  type,
  id,
  name,
  description,
  url,
  telephone,
  address,
  geo,
  images,
  rating,
  priceRange,
}) => {
  const jslonld = `{
    "@context": "http://schema.org",
    "@type": "${type}",
    "@id": "${id}",
    ${description ? `"description": "${description}",` : ''}
    ${url ? `"url": "${url}",` : ''}
    ${telephone ? `"telephone": "${telephone}",` : ''}
    ${buildAddress(address)}
    ${geo ? `${buildGeo(geo)}` : ''}
    ${rating ? `${buildRating(rating)}` : ''}
    ${priceRange ? `"priceRange": "${priceRange}",` : ''}
    "image":${formatIfArray(images)},
    "name": "${name}"
  }`;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={markup(jslonld)}
        key="jsonld-local-business"
      />
    </Head>
  );
};

export default LocalBusinessJsonLd;
