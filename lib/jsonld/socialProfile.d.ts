import { FC } from 'react';
export interface SocialProfileJsonLdProps {
  keyOverride?: string;
  type: string;
  name: string;
  url: string;
  sameAs: string[];
}
declare const SocialProfileJsonLd: FC<SocialProfileJsonLdProps>;
export default SocialProfileJsonLd;
