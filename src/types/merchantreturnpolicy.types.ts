import type { MerchantReturnPolicy } from "./common.types";

// Component props type that makes @type optional following library pattern
export type MerchantReturnPolicyJsonLdProps = Omit<
  MerchantReturnPolicy,
  "@type"
> & {
  scriptId?: string;
  scriptKey?: string;
};
