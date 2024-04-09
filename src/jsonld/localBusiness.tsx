import React from 'react';

import { JsonLd, JsonLdProps } from './jsonld';
import type {
  Address,
  Geo,
  AggregateRating,
  Review,
  Action,
  GeoCircle,
  OpeningHoursSpecification,
  Offer,
} from '../types';
import { setAddress } from '../utils/schema/setAddress';
import { setReviews } from '../utils/schema/setReviews';
import { setGeo } from '../utils/schema/setGeo';
import { setAggregateRating } from '../utils/schema/setAggregateRating';
import { setAction } from '../utils/schema/setAction';
import { setGeoCircle } from '../utils/schema/setGeoCircle';
import { setOffer } from '../utils/schema/setOffer';
import { setOpeningHours } from '../utils/schema/setOpeningHours';

export interface LocalBusinessJsonLdProps extends JsonLdProps {
  type: string;
  id: string;
  name: string;
  description: string;
  url?: string;
  telephone?: string;
  address: Address | Address[];
  geo?: Geo;
  images?: string[];
  rating?: AggregateRating;
  review?: Review[];
  priceRange?: string;
  servesCuisine?: string | string[];
  sameAs?: string[];
  openingHours?: OpeningHoursSpecification | OpeningHoursSpecification[];
  action?: Action;
  areaServed?: GeoCircle[];
  makesOffer?: Offer[];
}

function LocalBusinessJsonLd({
  type = 'LocalBusiness',
  keyOverride,
  address,
  geo,
  rating,
  review,
  action,
  areaServed,
  makesOffer,
  openingHours,
  images,
  ...rest
}: LocalBusinessJsonLdProps) {
  const data = {
    ...rest,
    image: images,
    address: setAddress(address),
    geo: setGeo(geo),
    aggregateRating: setAggregateRating(rating),
    review: setReviews(review),
    potentialAction: setAction(action),
    areaServed: areaServed && areaServed.map(setGeoCircle),
    makesOffer: makesOffer?.map(setOffer),
    openingHoursSpecification: Array.isArray(openingHours)
      ? openingHours.map(setOpeningHours)
      : setOpeningHours(openingHours),
  };

  return (
    <JsonLd
      type={type}
      keyOverride={keyOverride}
      {...data}
      scriptKey="LocalBusiness"
    />
  );
}

export default LocalBusinessJsonLd;
