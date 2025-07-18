import type {
  ImageObject,
  PostalAddress,
  ContactPoint,
  QuantitativeValue,
  MerchantReturnPolicy,
  MemberProgram,
} from "./common.types";

export interface OrganizationBase {
  name?: string;
  url?: string;
  logo?: string | ImageObject;
  description?: string;
  sameAs?: string | string[];
  address?: string | PostalAddress | (string | PostalAddress)[];
  contactPoint?: ContactPoint | ContactPoint[];
  telephone?: string;
  email?: string;
  alternateName?: string;
  foundingDate?: string;
  legalName?: string;
  taxID?: string;
  vatID?: string;
  duns?: string;
  leiCode?: string;
  naics?: string;
  globalLocationNumber?: string;
  iso6523Code?: string;
  numberOfEmployees?: number | QuantitativeValue;
}

export interface Organization extends OrganizationBase {
  "@type": "Organization";
}

export interface OnlineStore extends OrganizationBase {
  "@type": "OnlineStore";
  hasMerchantReturnPolicy?: MerchantReturnPolicy | MerchantReturnPolicy[];
  hasMemberProgram?: MemberProgram | MemberProgram[];
}

export type OrganizationJsonLdProps = (
  | Omit<Organization, "@type">
  | Omit<OnlineStore, "@type">
) & {
  type?: "Organization" | "OnlineStore";
  scriptId?: string;
  scriptKey?: string;
};
