import { JsonLdScript } from "~/core/JsonLdScript";
import type { OrganizationJsonLdProps } from "~/types/organization.types";
import {
  processAddress,
  processContactPoint,
  processLogo,
  processNumberOfEmployees,
  processReview,
  processAggregateRating,
  processMerchantReturnPolicy,
  processMemberProgram,
} from "~/utils/processors";

export default function OrganizationJsonLd(props: OrganizationJsonLdProps) {
  const {
    type = "Organization",
    scriptId,
    scriptKey,
    name,
    url,
    logo,
    description,
    sameAs,
    address,
    contactPoint,
    telephone,
    email,
    alternateName,
    foundingDate,
    legalName,
    taxID,
    vatID,
    duns,
    leiCode,
    naics,
    globalLocationNumber,
    iso6523Code,
    numberOfEmployees,
    review,
    aggregateRating,
  } = props;
  const data = {
    "@context": "https://schema.org",
    "@type": type,
    ...(name && { name }),
    ...(url && { url }),
    ...(logo && { logo: processLogo(logo) }),
    ...(description && { description }),
    ...(sameAs && {
      sameAs: Array.isArray(sameAs) ? sameAs : [sameAs],
    }),
    ...(address && {
      address: Array.isArray(address)
        ? address.map(processAddress)
        : processAddress(address),
    }),
    ...(contactPoint && {
      contactPoint: Array.isArray(contactPoint)
        ? contactPoint.map(processContactPoint)
        : processContactPoint(contactPoint),
    }),
    ...(telephone && { telephone }),
    ...(email && { email }),
    ...(alternateName && { alternateName }),
    ...(foundingDate && { foundingDate }),
    ...(legalName && { legalName }),
    ...(taxID && { taxID }),
    ...(vatID && { vatID }),
    ...(duns && { duns }),
    ...(leiCode && { leiCode }),
    ...(naics && { naics }),
    ...(globalLocationNumber && { globalLocationNumber }),
    ...(iso6523Code && { iso6523Code }),
    ...(numberOfEmployees && {
      numberOfEmployees: processNumberOfEmployees(numberOfEmployees),
    }),
    ...(review && {
      review: Array.isArray(review)
        ? review.map(processReview)
        : processReview(review),
    }),
    ...(aggregateRating && {
      aggregateRating: processAggregateRating(aggregateRating),
    }),
    ...(type === "OnlineStore" &&
      "hasMerchantReturnPolicy" in props &&
      props.hasMerchantReturnPolicy && {
        hasMerchantReturnPolicy: Array.isArray(props.hasMerchantReturnPolicy)
          ? props.hasMerchantReturnPolicy.map(processMerchantReturnPolicy)
          : processMerchantReturnPolicy(props.hasMerchantReturnPolicy),
      }),
    ...(type === "OnlineStore" &&
      "hasMemberProgram" in props &&
      props.hasMemberProgram && {
        hasMemberProgram: Array.isArray(props.hasMemberProgram)
          ? props.hasMemberProgram.map(processMemberProgram)
          : processMemberProgram(props.hasMemberProgram),
      }),
  };

  return (
    <JsonLdScript
      data={data}
      id={scriptId}
      scriptKey={scriptKey || `organization-jsonld-${type}`}
    />
  );
}

export type { OrganizationJsonLdProps };
