import React, { FC } from 'react';
import Head from 'next/head';

import markup from '../utils/markup';
import formatIfArray from '../utils/formatIfArray';
import { buildOffers } from '../utils/buildOffers';
import { buildAggregateOffer } from '../utils/buildAggregateOffer';
import { buildAggregateRating } from '../utils/buildAggregateRating';
import { buildReviews } from '../utils/buildReviews';

import { AggregateOffer, Offers, AggregateRating, Review } from '../types';

export interface ProductJsonLdProps {
  keyOverride?: string;
  productName: string;
  images?: string[];
  description?: string;
  brand?: string;
  reviews?: Review[];
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
  material?: string | ProductJsonLdProps;
  slogan?: string;
  disambiguatingDescription?: string;
  productionDate?: string;
  purchaseDate?: string;
  releaseDate?: string;
  award?: string;
}

const buildBrand = (brand: string) => `
  "brand": {
      "@type": "Thing",
      "name": "${brand}"
    },
`;

const ProductJsonLd: FC<ProductJsonLdProps> = ({
  keyOverride,
  productName,
  images = [],
  description,
  sku,
  gtin8,
  gtin13,
  gtin14,
  mpn,
  brand,
  reviews = [],
  aggregateRating,
  offers,
  aggregateOffer,
  color,
  manufacturerName,
  manufacturerLogo,
  material,
  slogan,
  disambiguatingDescription,
  productionDate,
  releaseDate,
  purchaseDate,
  award,
}) => {
  const jslonld = `{
    "@context": "https://schema.org/",
    "@type": "Product",
    ${images.length ? `"image":${formatIfArray(images)},` : ''}
    ${description ? `"description": "${description}",` : ''}
    ${mpn ? `"mpn": "${mpn}",` : ''}
    ${sku ? `"sku": "${sku}",` : ''}
    ${gtin8 ? `"gtin8": "${gtin8}",` : ''}
    ${gtin13 ? `"gtin13": "${gtin13}",` : ''}
    ${gtin14 ? `"gtin14": "${gtin14}",` : ''}
    ${brand ? buildBrand(brand) : ''}
    ${reviews.length ? buildReviews(reviews) : ''}
    ${aggregateRating ? buildAggregateRating(aggregateRating) : ''}
    ${color ? `"color": "${color}",` : ''}
    ${material ? `"material": "${material}",` : ''}
    ${slogan ? `"slogan": "${slogan}",` : ''}
    ${
      disambiguatingDescription
        ? `"disambiguatingDescription": "${disambiguatingDescription}",`
        : ''
    }
    ${productionDate ? `"productionDate": "${productionDate}",` : ''}
    ${releaseDate ? `"releaseDate": "${releaseDate}",` : ''}
    ${purchaseDate ? `"purchaseDate": "${purchaseDate}",` : ''}
    ${award ? `"award": "${award}",` : ''}
    ${
      manufacturerName
        ? `
        "manufacturer": {
          "@type": "Organization",
          ${
            manufacturerLogo
              ? `
              "logo": {
                "@type": "ImageObject",
                "url": "${manufacturerLogo}"
              },
              `
              : ''
          }
          "name": "${manufacturerName}"
        },
        `
        : ''
    }
    ${
      offers
        ? `"offers": ${
            Array.isArray(offers)
              ? `[${offers.map(offer => `${buildOffers(offer)}`)}]`
              : buildOffers(offers)
          },`
        : ''
    }
    ${
      aggregateOffer && !offers
        ? `"offers": ${buildAggregateOffer(aggregateOffer)},`
        : ''
    }
    "name": "${productName}"
  }`;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={markup(jslonld)}
        key={`jsonld-product${keyOverride ? `-${keyOverride}` : ''}`}
      />
    </Head>
  );
};

export default ProductJsonLd;
