import type {
  ImageObject,
  Review,
  AggregateRating,
  Brand,
  Organization,
  Person,
  MerchantReturnPolicy,
} from "./common.types";

// ItemAvailability enum
export type ItemAvailability =
  | "https://schema.org/BackOrder"
  | "https://schema.org/Discontinued"
  | "https://schema.org/InStock"
  | "https://schema.org/InStoreOnly"
  | "https://schema.org/LimitedAvailability"
  | "https://schema.org/OnlineOnly"
  | "https://schema.org/OutOfStock"
  | "https://schema.org/PreOrder"
  | "https://schema.org/PreSale"
  | "https://schema.org/SoldOut"
  | "BackOrder"
  | "Discontinued"
  | "InStock"
  | "InStoreOnly"
  | "LimitedAvailability"
  | "OnlineOnly"
  | "OutOfStock"
  | "PreOrder"
  | "PreSale"
  | "SoldOut";

// PriceSpecification for complex pricing
export interface PriceSpecification {
  "@type": "PriceSpecification";
  price: number | string;
  priceCurrency?: string;
  minPrice?: number;
  maxPrice?: number;
}

// UnitPriceSpecification for unit-based pricing
export interface UnitPriceSpecification {
  "@type": "UnitPriceSpecification";
  price: number | string;
  priceCurrency?: string;
  minPrice?: number;
  maxPrice?: number;
  referenceQuantity?: {
    "@type": "QuantitativeValue";
    value?: number;
    unitCode?: string;
    unitText?: string;
  };
}

// Product Offer type - extends the basic event Offer
export interface ProductOffer {
  "@type": "Offer";
  url?: string;
  price?: number | string;
  priceCurrency?: string;
  priceSpecification?: PriceSpecification | Omit<PriceSpecification, "@type">;
  availability?: ItemAvailability;
  availabilityStarts?: string;
  availabilityEnds?: string;
  priceValidUntil?: string;
  itemCondition?:
    | "https://schema.org/NewCondition"
    | "https://schema.org/UsedCondition"
    | "https://schema.org/DamagedCondition"
    | "https://schema.org/RefurbishedCondition"
    | "NewCondition"
    | "UsedCondition"
    | "DamagedCondition"
    | "RefurbishedCondition";
  seller?:
    | string
    | Organization
    | Person
    | Omit<Organization, "@type">
    | Omit<Person, "@type">;
  shippingDetails?: {
    "@type": "OfferShippingDetails";
    shippingRate?: {
      "@type": "MonetaryAmount";
      value?: number | string;
      currency?: string;
    };
    shippingDestination?: {
      "@type": "DefinedRegion";
      addressCountry?: string;
    };
    deliveryTime?: {
      "@type": "ShippingDeliveryTime";
      handlingTime?: {
        "@type": "QuantitativeValue";
        minValue?: number;
        maxValue?: number;
        unitCode?: string;
      };
      transitTime?: {
        "@type": "QuantitativeValue";
        minValue?: number;
        maxValue?: number;
        unitCode?: string;
      };
    };
  };
  hasMerchantReturnPolicy?:
    | MerchantReturnPolicy
    | Omit<MerchantReturnPolicy, "@type">
    | MerchantReturnPolicy[]
    | Omit<MerchantReturnPolicy, "@type">[];
}

// AggregateOffer for multiple sellers
export interface AggregateOffer {
  "@type": "AggregateOffer";
  lowPrice: number | string;
  priceCurrency: string;
  highPrice?: number | string;
  offerCount?: number;
  offers?: ProductOffer[] | Omit<ProductOffer, "@type">[];
}

// ListItem for pros and cons
export interface ProductListItem {
  "@type": "ListItem";
  position?: number;
  name: string;
}

// ItemList for pros and cons
export interface ProductItemList {
  "@type": "ItemList";
  itemListElement: (ProductListItem | Omit<ProductListItem, "@type">)[];
}

// Extended Review with pros/cons
export interface ProductReview extends Omit<Review, "@type"> {
  "@type": "Review";
  name?: string;
  positiveNotes?: ProductItemList | Omit<ProductItemList, "@type">;
  negativeNotes?: ProductItemList | Omit<ProductItemList, "@type">;
}

// Product base interface
export interface ProductBase {
  name: string;
  description?: string;
  image?:
    | string
    | ImageObject
    | Omit<ImageObject, "@type">
    | (string | ImageObject | Omit<ImageObject, "@type">)[];
  sku?: string;
  mpn?: string;
  gtin?: string;
  gtin8?: string;
  gtin12?: string;
  gtin13?: string;
  gtin14?: string;
  brand?: string | Brand | Omit<Brand, "@type">;
  review?:
    | ProductReview
    | Omit<ProductReview, "@type">
    | (ProductReview | Omit<ProductReview, "@type">)[];
  aggregateRating?: AggregateRating | Omit<AggregateRating, "@type">;
  offers?:
    | ProductOffer
    | AggregateOffer
    | Omit<ProductOffer, "@type">
    | Omit<AggregateOffer, "@type">
    | (ProductOffer | Omit<ProductOffer, "@type">)[];
  category?: string;
  color?: string;
  material?: string;
  model?: string;
  productID?: string;
  url?: string;
  weight?:
    | string
    | {
        "@type"?: "QuantitativeValue";
        value?: number;
        unitCode?: string;
        unitText?: string;
      };
  width?:
    | string
    | {
        "@type"?: "QuantitativeValue";
        value?: number;
        unitCode?: string;
        unitText?: string;
      };
  height?:
    | string
    | {
        "@type"?: "QuantitativeValue";
        value?: number;
        unitCode?: string;
        unitText?: string;
      };
  depth?:
    | string
    | {
        "@type"?: "QuantitativeValue";
        value?: number;
        unitCode?: string;
        unitText?: string;
      };
  additionalProperty?: {
    "@type": "PropertyValue";
    name: string;
    value: string | number;
  }[];
  manufacturer?:
    | string
    | Organization
    | Person
    | Omit<Organization, "@type">
    | Omit<Person, "@type">;
  releaseDate?: string;
  productionDate?: string;
  purchaseDate?: string;
  expirationDate?: string;
  award?: string | string[];
  // Additional variant properties
  size?: string;
  pattern?: string;
  // Properties for variant relationships
  isVariantOf?: { "@id": string } | ProductGroup | Omit<ProductGroup, "@type">;
  inProductGroupWithID?: string;
}

// Product type
export interface Product extends ProductBase {
  "@type": "Product" | ["Product", "Car"];
}

// VariesBy type for specifying variant properties
export type VariesBy =
  | "https://schema.org/color"
  | "https://schema.org/size"
  | "https://schema.org/material"
  | "https://schema.org/pattern"
  | "https://schema.org/suggestedAge"
  | "https://schema.org/suggestedGender"
  | "color"
  | "size"
  | "material"
  | "pattern"
  | "suggestedAge"
  | "suggestedGender";

// ProductGroup interface for grouping product variants
export interface ProductGroup {
  "@type": "ProductGroup";
  "@id"?: string;
  name: string;
  description?: string;
  url?: string;
  image?:
    | string
    | ImageObject
    | Omit<ImageObject, "@type">
    | (string | ImageObject | Omit<ImageObject, "@type">)[];
  brand?:
    | string
    | Brand
    | Organization
    | Omit<Brand, "@type">
    | Omit<Organization, "@type">;
  review?:
    | ProductReview
    | Omit<ProductReview, "@type">
    | (ProductReview | Omit<ProductReview, "@type">)[];
  aggregateRating?: AggregateRating | Omit<AggregateRating, "@type">;
  audience?: {
    "@type"?: "PeopleAudience";
    suggestedGender?: "male" | "female" | "unisex";
    suggestedAge?: {
      "@type"?: "QuantitativeValue";
      minValue?: number;
      maxValue?: number;
      unitCode?: string;
    };
  };
  productGroupID: string;
  variesBy?: VariesBy | VariesBy[];
  hasVariant?: (
    | Product
    | Omit<Product, "@type">
    | { url: string }
    | { "@type": "Product"; url: string }
  )[];
  pattern?: string;
  material?: string;
  category?: string;
}

// Component props
export type ProductJsonLdProps = (
  | (Omit<Product, "@type"> & {
      type?: "Product";
      isCar?: boolean; // Helper prop to add Car type alongside Product
    })
  | (Omit<ProductGroup, "@type"> & {
      type?: "ProductGroup";
    })
) & {
  scriptId?: string;
  scriptKey?: string;
};
