import { FC } from 'react';
import { Review } from './product';
import { AggregateRating } from './recipe';
export interface SoftwareAppJsonLdProps {
  keyOverride?: string;
  name: string;
  price: string;
  priceCurrency: string;
  applicationCategory?: string;
  operatingSystem?: string;
  review?: Review;
  aggregateRating?: AggregateRating;
}
declare const SoftwareAppJsonLd: FC<SoftwareAppJsonLdProps>;
export default SoftwareAppJsonLd;
