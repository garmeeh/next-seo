import { FC } from 'react';
export interface ItemListElements {
  item: string;
  name: string;
  position: number;
}
export interface BreadCrumbJsonLdProps {
  keyOverride?: string;
  itemListElements: ItemListElements[];
}
declare const BreadCrumbJsonLd: FC<BreadCrumbJsonLdProps>;
export default BreadCrumbJsonLd;
