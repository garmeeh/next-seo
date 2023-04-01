import React from 'react';

import { JsonLd, JsonLdProps } from './jsonld';
import type {
  Review,
  AggregateRating,
  AggregateOffer,
  Offers,
} from 'src/types';

import { setOffers } from 'src/utils/schema/setOffers';
import { setReviews } from 'src/utils/schema/setReviews';
import { setAggregateRating } from 'src/utils/schema/setAggregateRating';
import { setAggregateOffer } from 'src/utils/schema/setAggregateOffer';
import { setManufacturer } from 'src/utils/schema/setManufacturer';
import { setBrand } from 'src/utils/schema/setBrand';

export interface ProductJsonLdProps extends JsonLdProps {
  productName: string;
  images?: string[];
  description?: string;
  brand?: string;
  reviews?: Review | Review[];
  aggregateRating?: AggregateRating;
  offers?: Offers | Offers[];
  aggregateOffer?: AggregateOffer;
  sku?: string;
  gtin8?: string;
  gtin13?: string;
  gtin14?: string;
  mpn?: string;
  color?: string;
  manufacturerName?: string;
  manufacturerLogo?: string;
  material?: string;
  slogan?: string;
  disambiguatingDescription?: string;
  productionDate?: string;
  purchaseDate?: string;
  releaseDate?: string;
  award?: string;
  category?: string;
}

function ProductJsonLd({
  type = 'Product',
  keyOverride,
  images,
  brand,
  reviews,
  aggregateRating,
  manufacturerLogo,
  manufacturerName,
  offers,
  aggregateOffer,
  productName,
  ...rest
}: ProductJsonLdProps) {
  const data = {
    ...rest,
    image: images,
    brand: setBrand(brand),
    review: setReviews(reviews),
    aggregateRating: setAggregateRating(aggregateRating),
    manufacturer: setManufacturer({ manufacturerLogo, manufacturerName }),
    offers: offers ? setOffers(offers) : setAggregateOffer(aggregateOffer),
    name: productName,
  };
  return (
    <JsonLd
      type={type}
      keyOverride={keyOverride}
      {...data}
      scriptKey="Product"
    />
  );
}

export default ProductJsonLd;
