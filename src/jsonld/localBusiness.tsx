import React, { FC } from 'react';
import Head from 'next/head';

import markup from '../utils/markup';
import formatIfArray from '../utils/formatIfArray';
import buildAddress from '../utils/buildAddress';
import { Address } from '../types';

type Action = {
  actionName: string;
  actionType: string;
  target: string;
};

type AggregateRating = {
  ratingValue: string;
  ratingCount: string;
};

type AreaServed = GeoCircle[];

type Geo = {
  latitude: string;
  longitude: string;
};

type GeoCircle = {
  geoMidpoint: Geo;
  geoRadius: string;
};

type MakesOffer = Offer[];

type Offer = {
  priceSpecification: PriceSpecification;
  itemOffered: Service;
};

type OpeningHoursSpecification = {
  opens: string;
  closes: string;
  dayOfWeek: string | string[];
  validFrom?: string;
  validThrough?: string;
};

type PriceSpecification = {
  type: string;
  priceCurrency: string;
  price: string;
};

type Rating = {
  ratingValue: string;
  worstRating?: string;
  bestRating?: string;
  reviewAspect?: string;
};

type Review = {
  author: string;
  datePublished: string;
  reviewBody: string;
  reviewRating: Rating;
  name?: string;
};

type Service = {
  name: string;
  description: string;
};

export interface LocalBusinessJsonLdProps {
  keyOverride?: string;
  type: string;
  id: string;
  name: string;
  description: string;
  url?: string;
  telephone?: string;
  address: Address;
  geo?: Geo;
  images?: string[];
  rating?: AggregateRating;
  review?: Review[];
  priceRange?: string;
  servesCuisine?: string | string[];
  sameAs?: string[];
  openingHours?: OpeningHoursSpecification | OpeningHoursSpecification[];
  action?: Action;
  areaServed?: AreaServed;
  makesOffer?: MakesOffer;
}

const buildAction = (action: Action) => `
  "${action.actionName}": {
    "@type": "${action.actionType}",
    "target": "${action.target}"
  }
`;

const buildAreaServed = (areaServed: AreaServed) => `
  "areaServed": [
    ${areaServed.map(area => buildGeoCircle(area))}
  ]
`;

const buildAggregateRating = (aggregateRating: AggregateRating) => `
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "${aggregateRating.ratingValue}",
    "ratingCount": "${aggregateRating.ratingCount}"
  },
`;

const buildGeo = (geo: Geo) => `
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "${geo.latitude}",
    "longitude": "${geo.longitude}"
  },
`;

const buildGeoCircle = (geoCircle: GeoCircle) => `
  {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "${geoCircle.geoMidpoint.latitude}",
      "longitude": "${geoCircle.geoMidpoint.longitude}"
    },
    "geoRadius": "${geoCircle.geoRadius}"
  }
`;

const buildMakesOffer = (makesOffer: MakesOffer) => `
  "makesOffer":[
    ${makesOffer.map(offer => buildOffer(offer))}
  ]
`;

const buildOffer = (offer: Offer) => `
  {
    "@type": "Offer",
    ${buildPriceSpecification(offer.priceSpecification)},
    ${buildItemOffered(offer.itemOffered)}
  }
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

const buildPriceSpecification = (priceSpecification: PriceSpecification) => `
  "priceSpecification": {
    "@type": "${priceSpecification.type}",
    "priceCurrency": "${priceSpecification.priceCurrency}",
    "price": "${priceSpecification.price}"
  }
`;

const buildRating = (rating: Rating) => `
  {
    "@type": "Rating",
    ${rating.bestRating ? `"bestRating": "${rating.bestRating}",` : ''}
    ${rating.reviewAspect ? `"reviewAspect": "${rating.reviewAspect}",` : ''}
    ${rating.worstRating ? `"worstRating": "${rating.worstRating}",` : ''}
    "ratingValue": "${rating.ratingValue}"
  }
`;

const buildReview = (reviews: Review[]) => `
  "review": [
    ${reviews.map(
      review => `
      {
        "@type": "Review",
        "author": "${review.author}",
        "datePublished": "${review.datePublished}",
        ${review.name ? `"name": "${review.name}",` : ''}
        "reviewBody": "${review.reviewBody}",
        "reviewRating": ${buildRating(review.reviewRating)}
      }
    `,
    )}
  ],
`;

const buildItemOffered = (service: Service) => `
  "itemOffered": {
    "@type": "Service",
    "name": "${service.name}",
    "description": "${service.description}"
  }
`;

const LocalBusinessJsonLd: FC<LocalBusinessJsonLdProps> = ({
  keyOverride,
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
  review,
  priceRange,
  servesCuisine,
  sameAs,
  openingHours,
  action,
  areaServed,
  makesOffer,
}) => {
  const jslonld = `{
    "@context": "https://schema.org",
    "@type": "${type}",
    ${id ? `"@id": "${id}",` : ''}
    ${description ? `"description": "${description}",` : ''}
    ${url ? `"url": "${url}",` : ''}
    ${telephone ? `"telephone": "${telephone}",` : ''}
    ${buildAddress(address)}
    ${geo ? `${buildGeo(geo)}` : ''}
    ${rating ? `${buildAggregateRating(rating)}` : ''}
    ${review ? `${buildReview(review)}` : ''}
    ${action ? `${buildAction(action)},` : ''}
    ${areaServed ? `${buildAreaServed(areaServed)},` : ''}
    ${makesOffer ? `${buildMakesOffer(makesOffer)},` : ''}
    ${priceRange ? `"priceRange": "${priceRange}",` : ''}
    ${servesCuisine ? `"servesCuisine":${formatIfArray(servesCuisine)},` : ''}
    ${images ? `"image":${formatIfArray(images)},` : ''}
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
        dangerouslySetInnerHTML={markup(jslonld)}
        key={`jsonld-local-business${keyOverride ? `-${keyOverride}` : ''}`}
      />
    </Head>
  );
};

export default LocalBusinessJsonLd;
