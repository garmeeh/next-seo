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
  processVariesBy,
  processProductVariant,
} from "~/utils/processors";

export default function ProductJsonLd(props: ProductJsonLdProps) {
  const { scriptId, scriptKey, ...rest } = props;

  // Determine if this is a ProductGroup or Product
  const isProductGroup =
    ("type" in rest && rest.type === "ProductGroup") ||
    "hasVariant" in rest ||
    "variesBy" in rest ||
    "productGroupID" in rest;

  let data: Record<string, unknown>;

  if (isProductGroup) {
    // Handle ProductGroup - safe to cast since we checked above
    const groupProps = rest as Extract<
      ProductJsonLdProps,
      { type?: "ProductGroup" }
    >;

    data = {
      "@context": "https://schema.org",
      "@type": "ProductGroup",
      name: groupProps.name,
      ...(groupProps.description && { description: groupProps.description }),
      ...(groupProps.url && { url: groupProps.url }),
      ...(groupProps.image && {
        image: Array.isArray(groupProps.image)
          ? groupProps.image.map(processImage)
          : processImage(groupProps.image),
      }),
      ...(groupProps.brand && {
        brand:
          typeof groupProps.brand === "string"
            ? { "@type": "Brand", name: groupProps.brand }
            : processBrand(groupProps.brand),
      }),
      ...(groupProps.review && {
        review: Array.isArray(groupProps.review)
          ? groupProps.review.map(processProductReview)
          : processProductReview(groupProps.review),
      }),
      ...(groupProps.aggregateRating && {
        aggregateRating: processAggregateRating(groupProps.aggregateRating),
      }),
      ...(groupProps.audience && { audience: groupProps.audience }),
      productGroupID: groupProps.productGroupID,
      ...(groupProps.variesBy && {
        variesBy: processVariesBy(groupProps.variesBy),
      }),
      ...(groupProps.hasVariant && {
        hasVariant: groupProps.hasVariant.map(processProductVariant),
      }),
      ...(groupProps.pattern && { pattern: groupProps.pattern }),
      ...(groupProps.material && { material: groupProps.material }),
      ...(groupProps.category && { category: groupProps.category }),
    };
  } else {
    // Handle regular Product - safe to cast since we checked above
    const productProps = rest as Extract<
      ProductJsonLdProps,
      { type?: "Product" }
    >;

    // Product requires at least one of: review, aggregateRating, or offers
    if (
      !productProps.review &&
      !productProps.aggregateRating &&
      !productProps.offers &&
      !productProps.isVariantOf
    ) {
      console.warn(
        "ProductJsonLd: Product structured data requires at least one of: review, aggregateRating, offers, or isVariantOf",
      );
    }

    // Process offers - can be single offer, aggregate offer, or array
    let processedOffers;
    if (productProps.offers) {
      if (Array.isArray(productProps.offers)) {
        processedOffers = productProps.offers.map((offer) => {
          // Check if it's an AggregateOffer
          if ("lowPrice" in offer && "priceCurrency" in offer) {
            return processAggregateOffer(
              offer as Parameters<typeof processAggregateOffer>[0],
            );
          }
          return processProductOffer(offer);
        });
      } else if (
        "lowPrice" in productProps.offers &&
        "priceCurrency" in productProps.offers
      ) {
        // It's an AggregateOffer
        processedOffers = processAggregateOffer(
          productProps.offers as Parameters<typeof processAggregateOffer>[0],
        );
      } else {
        // It's a regular Offer
        processedOffers = processProductOffer(productProps.offers);
      }
    }

    // Process reviews - can be single or array
    let processedReview;
    if (productProps.review) {
      processedReview = Array.isArray(productProps.review)
        ? productProps.review.map(processProductReview)
        : processProductReview(productProps.review);
    }

    // Process brand - can be string or Brand object
    let processedBrand;
    if (productProps.brand) {
      if (typeof productProps.brand === "string") {
        processedBrand = {
          "@type": "Brand",
          name: productProps.brand,
        };
      } else {
        processedBrand = processBrand(productProps.brand);
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

    data = {
      "@context": "https://schema.org",
      "@type": productProps.isCar ? ["Product", "Car"] : "Product",
      name: productProps.name,
      ...(productProps.description && {
        description: productProps.description,
      }),
      ...(productProps.image && {
        image: Array.isArray(productProps.image)
          ? productProps.image.map(processImage)
          : processImage(productProps.image),
      }),
      ...(productProps.sku && { sku: productProps.sku }),
      ...(productProps.mpn && { mpn: productProps.mpn }),
      ...(productProps.gtin && { gtin: productProps.gtin }),
      ...(productProps.gtin8 && { gtin8: productProps.gtin8 }),
      ...(productProps.gtin12 && { gtin12: productProps.gtin12 }),
      ...(productProps.gtin13 && { gtin13: productProps.gtin13 }),
      ...(productProps.gtin14 && { gtin14: productProps.gtin14 }),
      ...(processedBrand && { brand: processedBrand }),
      ...(processedReview && { review: processedReview }),
      ...(productProps.aggregateRating && {
        aggregateRating: processAggregateRating(productProps.aggregateRating),
      }),
      ...(processedOffers && { offers: processedOffers }),
      ...(productProps.category && { category: productProps.category }),
      ...(productProps.color && { color: productProps.color }),
      ...(productProps.material && { material: productProps.material }),
      ...(productProps.model && { model: productProps.model }),
      ...(productProps.productID && { productID: productProps.productID }),
      ...(productProps.url && { url: productProps.url }),
      ...(productProps.weight && {
        weight: processQuantitativeValue(productProps.weight),
      }),
      ...(productProps.width && {
        width: processQuantitativeValue(productProps.width),
      }),
      ...(productProps.height && {
        height: processQuantitativeValue(productProps.height),
      }),
      ...(productProps.depth && {
        depth: processQuantitativeValue(productProps.depth),
      }),
      ...(productProps.additionalProperty && {
        additionalProperty: productProps.additionalProperty,
      }),
      ...(productProps.manufacturer && {
        manufacturer: processAuthor(productProps.manufacturer),
      }),
      ...(productProps.releaseDate && {
        releaseDate: productProps.releaseDate,
      }),
      ...(productProps.productionDate && {
        productionDate: productProps.productionDate,
      }),
      ...(productProps.purchaseDate && {
        purchaseDate: productProps.purchaseDate,
      }),
      ...(productProps.expirationDate && {
        expirationDate: productProps.expirationDate,
      }),
      ...(productProps.award && { award: productProps.award }),
      ...(productProps.size && { size: productProps.size }),
      ...(productProps.pattern && { pattern: productProps.pattern }),
      ...(productProps.isVariantOf && {
        isVariantOf: productProps.isVariantOf,
      }),
      ...(productProps.inProductGroupWithID && {
        inProductGroupWithID: productProps.inProductGroupWithID,
      }),
    };
  }

  return (
    <JsonLdScript
      data={data}
      id={scriptId}
      scriptKey={
        scriptKey || (isProductGroup ? "productgroup-jsonld" : "product-jsonld")
      }
    />
  );
}

export type { ProductJsonLdProps };
