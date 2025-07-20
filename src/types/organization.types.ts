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
  logo?: string | ImageObject | Omit<ImageObject, "@type">;
  description?: string;
  sameAs?: string | string[];
  address?:
    | string
    | PostalAddress
    | Omit<PostalAddress, "@type">
    | (string | PostalAddress | Omit<PostalAddress, "@type">)[];
  contactPoint?:
    | ContactPoint
    | Omit<ContactPoint, "@type">
    | ContactPoint[]
    | Omit<ContactPoint, "@type">[];
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
  numberOfEmployees?:
    | number
    | QuantitativeValue
    | Omit<QuantitativeValue, "@type">;
}

export interface Organization extends OrganizationBase {
  "@type": "Organization";
}

export interface OnlineStore extends OrganizationBase {
  "@type": "OnlineStore";
  hasMerchantReturnPolicy?:
    | MerchantReturnPolicy
    | Omit<MerchantReturnPolicy, "@type">
    | MerchantReturnPolicy[]
    | Omit<MerchantReturnPolicy, "@type">[];
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
