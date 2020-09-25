import React, { FC } from 'react';
import Head from 'next/head';

import markup from '../utils/markup';
import formatIfArray from '../utils/formatIfArray';
import minifyJsonLd from '../utils/minifyJsonLd';
import buildAddress from '../utils/buildAddress';
import { Address } from '../types';

type Geo = {
  latitude: string;
  longitude: string;
};

type Rating = {
  ratingValue: string;
  ratingCount: string;
};

type OpeningHoursSpecification = {
  opens: string;
  closes: string;
  dayOfWeek: string | string[];
  validFrom?: string;
  validThrough?: string;
};

export interface LocalBusinessJsonLdProps {
  type: string;
  id: string;
  name: string;
  description: string;
  url?: string;
  telephone?: string;
  address: Address;
  geo?: Geo;
  images: string[];
  rating?: Rating;
  priceRange?: string;
  sameAs?: string[];
  openingHours?: OpeningHoursSpecification | OpeningHoursSpecification[];
}

const buildGeo = (geo: Geo) => `
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "${geo.latitude}",
    "longitude": "${geo.longitude}"
  },
`;

const buildRating = (rating: Rating) => `
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "${rating.ratingValue}",
    "ratingCount": "${rating.ratingCount}"
  },
`;

const buildOpeningHours = (openingHours: OpeningHoursSpecification) => `
  {
    "@type": "OpeningHoursSpecification",
    ${
      openingHours.dayOfWeek
        ? `"dayOfWeek": ${formatIfArray(openingHours.dayOfWeek)},`
        : ''
    }
    "opens": "${openingHours.opens}",
    ${openingHours.validFrom ? `"validFrom": "${openingHours.validFrom}",` : ''}
    ${
      openingHours.validThrough
        ? `"validThrough": "${openingHours.validThrough}",`
        : ''
    }
    "closes": "${openingHours.closes}"
  }
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
  sameAs,
  openingHours,
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
    ${sameAs ? `"sameAs": [${sameAs.map(url => `"${url}"`)}],` : ''}
    ${
      openingHours
        ? `"openingHoursSpecification": ${
            Array.isArray(openingHours)
              ? `[${openingHours.map(hours => `${buildOpeningHours(hours)}`)}]`
              : buildOpeningHours(openingHours)
          },`
        : ''
    }
    "name": "${name}"
  }`;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={markup(minifyJsonLd(jslonld))}
        key="jsonld-local-business"
      />
    </Head>
  );
};

export default LocalBusinessJsonLd;
