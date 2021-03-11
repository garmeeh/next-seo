import { FC } from 'react';
export interface PotentialAction {
  target: string;
  queryInput: string;
}
export interface SiteLinksSearchBoxJsonLdProps {
  keyOverride?: string;
  url: string;
  potentialActions: PotentialAction[];
}
declare const SiteLinksSearchBoxJsonLd: FC<SiteLinksSearchBoxJsonLdProps>;
export default SiteLinksSearchBoxJsonLd;
