import type {
  Organization,
  MerchantReturnPolicy,
  MemberProgram,
} from "./common.types";

// OrganizationBase contains all properties except @type
// This is used by OnlineStore and other organization subtypes
type OrganizationBase = Omit<Organization, "@type">;

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
