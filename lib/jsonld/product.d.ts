import { FC } from 'react';
import { AggregateOffer, Offers } from '../types';
export declare type ReviewRating = {
  bestRating?: string;
  ratingValue: string;
  worstRating?: string;
};
export declare type Author = {
  type: string;
  name: string;
};
export declare type Publisher = {
  type: string;
  name: string;
};
export declare type Review = {
  author: Author;
  datePublished?: string;
  reviewBody?: string;
  name?: string;
  publisher?: Publisher;
  reviewRating: ReviewRating;
};
export declare type AggregateRating = {
  ratingValue: string;
  reviewCount: string;
};
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
}
export declare const buildReviewRating: (rating: ReviewRating) => string;
export declare const buildAuthor: (author: Author) => string;
export declare const buildPublisher: (publisher: Publisher) => string;
export declare const buildReviews: (reviews: Review[]) => string;
export declare const buildAggregateRating: (
  aggregateRating: AggregateRating,
) => string;
declare const ProductJsonLd: FC<ProductJsonLdProps>;
export default ProductJsonLd;
