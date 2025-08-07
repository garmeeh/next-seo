import { JsonLdScript } from "~/core/JsonLdScript";
import type { MerchantReturnPolicyJsonLdProps } from "~/types/merchantreturnpolicy.types";
import {
  processMerchantReturnPolicy,
  processSimpleMonetaryAmount,
  processReturnPolicySeasonalOverride,
} from "~/utils/processors";

export default function MerchantReturnPolicyJsonLd({
  scriptId,
  scriptKey,
  applicableCountry,
  returnPolicyCountry,
  returnPolicyCategory,
  merchantReturnDays,
  returnMethod,
  returnFees,
  returnShippingFeesAmount,
  refundType,
  restockingFee,
  returnLabelSource,
  itemCondition,
  customerRemorseReturnFees,
  customerRemorseReturnShippingFeesAmount,
  customerRemorseReturnLabelSource,
  itemDefectReturnFees,
  itemDefectReturnShippingFeesAmount,
  itemDefectReturnLabelSource,
  returnPolicySeasonalOverride,
  merchantReturnLink,
}: MerchantReturnPolicyJsonLdProps) {
  // Build the return policy object
  const returnPolicy = {
    "@type": "MerchantReturnPolicy" as const,
    // Option B: Simple link to policy
    ...(merchantReturnLink && { merchantReturnLink }),
    // Option A: Detailed properties
    ...(applicableCountry && {
      applicableCountry: Array.isArray(applicableCountry)
        ? applicableCountry
        : [applicableCountry],
    }),
    ...(returnPolicyCountry && {
      returnPolicyCountry: Array.isArray(returnPolicyCountry)
        ? returnPolicyCountry
        : [returnPolicyCountry],
    }),
    ...(returnPolicyCategory && { returnPolicyCategory }),
    ...(merchantReturnDays !== undefined && { merchantReturnDays }),
    ...(returnMethod && {
      returnMethod: Array.isArray(returnMethod) ? returnMethod : [returnMethod],
    }),
    ...(returnFees && { returnFees }),
    ...(returnShippingFeesAmount && {
      returnShippingFeesAmount: processSimpleMonetaryAmount(
        returnShippingFeesAmount,
      ),
    }),
    ...(refundType && {
      refundType: Array.isArray(refundType) ? refundType : [refundType],
    }),
    ...(restockingFee !== undefined && {
      restockingFee:
        typeof restockingFee === "number"
          ? restockingFee
          : processSimpleMonetaryAmount(restockingFee),
    }),
    ...(returnLabelSource && { returnLabelSource }),
    ...(itemCondition && {
      itemCondition: Array.isArray(itemCondition)
        ? itemCondition
        : [itemCondition],
    }),
    // Customer remorse specific properties
    ...(customerRemorseReturnFees && { customerRemorseReturnFees }),
    ...(customerRemorseReturnShippingFeesAmount && {
      customerRemorseReturnShippingFeesAmount: processSimpleMonetaryAmount(
        customerRemorseReturnShippingFeesAmount,
      ),
    }),
    ...(customerRemorseReturnLabelSource && {
      customerRemorseReturnLabelSource,
    }),
    // Item defect specific properties
    ...(itemDefectReturnFees && { itemDefectReturnFees }),
    ...(itemDefectReturnShippingFeesAmount && {
      itemDefectReturnShippingFeesAmount: processSimpleMonetaryAmount(
        itemDefectReturnShippingFeesAmount,
      ),
    }),
    ...(itemDefectReturnLabelSource && { itemDefectReturnLabelSource }),
    // Seasonal override
    ...(returnPolicySeasonalOverride && {
      returnPolicySeasonalOverride: Array.isArray(returnPolicySeasonalOverride)
        ? returnPolicySeasonalOverride.map(processReturnPolicySeasonalOverride)
        : processReturnPolicySeasonalOverride(returnPolicySeasonalOverride),
    }),
  };

  // Process the entire policy to ensure all nested types are correct
  const processedPolicy = processMerchantReturnPolicy(returnPolicy);

  const data = {
    "@context": "https://schema.org",
    ...processedPolicy,
  };

  return (
    <JsonLdScript
      data={data}
      id={scriptId}
      scriptKey={scriptKey || "merchant-return-policy-jsonld"}
    />
  );
}

export type { MerchantReturnPolicyJsonLdProps };
