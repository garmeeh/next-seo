import type {
  ImageObject,
  Review,
  AggregateRating,
  Brand,
  Organization,
  Person,
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
}

// Product type
export interface Product extends ProductBase {
  "@type": "Product" | ["Product", "Car"];
}

// Component props
export type ProductJsonLdProps = Omit<Product, "@type"> & {
  scriptId?: string;
  scriptKey?: string;
  isCar?: boolean; // Helper prop to add Car type alongside Product
};
