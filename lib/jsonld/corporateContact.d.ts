import { FC } from 'react';
export interface ContactPoint {
  contactType: string;
  telephone: string;
  areaServed?: string | string[];
  availableLanguage?: string | string[];
  contactOption?: string | string[];
}
export interface CorporateContactJsonLdProps {
  keyOverride?: string;
  url: string;
  contactPoint: ContactPoint[];
  logo?: string;
}
declare const CorporateContactJsonLd: FC<CorporateContactJsonLdProps>;
export default CorporateContactJsonLd;
