import { JsonLdScript } from "~/core/JsonLdScript";
import type { ProductJsonLdProps } from "~/types/product.types";
import {
  processImage,
  processBrand,
  processProductReview,
  processAggregateRating,
  processProductOffer,
  processAggregateOffer,
  processAuthor,
} from "~/utils/processors";

export default function ProductJsonLd({
  scriptId,
  scriptKey,
  name,
  description,
  image,
  sku,
  mpn,
  gtin,
  gtin8,
  gtin12,
  gtin13,
  gtin14,
  brand,
  review,
  aggregateRating,
  offers,
  category,
  color,
  material,
  model,
  productID,
  url,
  weight,
  width,
  height,
  depth,
  additionalProperty,
  manufacturer,
  releaseDate,
  productionDate,
  purchaseDate,
  expirationDate,
  award,
  isCar,
}: ProductJsonLdProps) {
  // Product requires at least one of: review, aggregateRating, or offers
  if (!review && !aggregateRating && !offers) {
    console.warn(
      "ProductJsonLd: Product structured data requires at least one of: review, aggregateRating, or offers",
    );
  }

  // Process offers - can be single offer, aggregate offer, or array
  let processedOffers;
  if (offers) {
    if (Array.isArray(offers)) {
      processedOffers = offers.map((offer) => {
        // Check if it's an AggregateOffer
        if ("lowPrice" in offer && "priceCurrency" in offer) {
          return processAggregateOffer(
            offer as Parameters<typeof processAggregateOffer>[0],
          );
        }
        return processProductOffer(offer);
      });
    } else if ("lowPrice" in offers && "priceCurrency" in offers) {
      // It's an AggregateOffer
      processedOffers = processAggregateOffer(
        offers as Parameters<typeof processAggregateOffer>[0],
      );
    } else {
      // It's a regular Offer
      processedOffers = processProductOffer(offers);
    }
  }

  // Process reviews - can be single or array
  let processedReview;
  if (review) {
    processedReview = Array.isArray(review)
      ? review.map(processProductReview)
      : processProductReview(review);
  }

  // Process brand - can be string or Brand object
  let processedBrand;
  if (brand) {
    if (typeof brand === "string") {
      processedBrand = {
        "@type": "Brand",
        name: brand,
      };
    } else {
      processedBrand = processBrand(brand);
    }
  }

  // Process weight/dimensions - can be string or QuantitativeValue
  const processQuantitativeValue = (
    value:
      | string
      | {
          "@type"?: "QuantitativeValue";
          value?: number;
          unitCode?: string;
          unitText?: string;
        }
      | undefined,
  ) => {
    if (typeof value === "string") {
      return value;
    }
    if (value && typeof value === "object" && !("@type" in value)) {
      return {
        "@type": "QuantitativeValue",
        ...value,
      };
    }
    return value;
  };

  const data = {
    "@context": "https://schema.org",
    "@type": isCar ? ["Product", "Car"] : "Product",
    name,
    ...(description && { description }),
    ...(image && {
      image: Array.isArray(image)
        ? image.map(processImage)
        : processImage(image),
    }),
    ...(sku && { sku }),
    ...(mpn && { mpn }),
    ...(gtin && { gtin }),
    ...(gtin8 && { gtin8 }),
    ...(gtin12 && { gtin12 }),
    ...(gtin13 && { gtin13 }),
    ...(gtin14 && { gtin14 }),
    ...(processedBrand && { brand: processedBrand }),
    ...(processedReview && { review: processedReview }),
    ...(aggregateRating && {
      aggregateRating: processAggregateRating(aggregateRating),
    }),
    ...(processedOffers && { offers: processedOffers }),
    ...(category && { category }),
    ...(color && { color }),
    ...(material && { material }),
    ...(model && { model }),
    ...(productID && { productID }),
    ...(url && { url }),
    ...(weight && { weight: processQuantitativeValue(weight) }),
    ...(width && { width: processQuantitativeValue(width) }),
    ...(height && { height: processQuantitativeValue(height) }),
    ...(depth && { depth: processQuantitativeValue(depth) }),
    ...(additionalProperty && { additionalProperty }),
    ...(manufacturer && { manufacturer: processAuthor(manufacturer) }),
    ...(releaseDate && { releaseDate }),
    ...(productionDate && { productionDate }),
    ...(purchaseDate && { purchaseDate }),
    ...(expirationDate && { expirationDate }),
    ...(award && { award }),
  };

  return (
    <JsonLdScript
      data={data}
      id={scriptId}
      scriptKey={scriptKey || "product-jsonld"}
    />
  );
}

export type { ProductJsonLdProps };
