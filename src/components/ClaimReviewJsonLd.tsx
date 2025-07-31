import { JsonLdScript } from "~/core/JsonLdScript";
import type { ClaimReviewJsonLdProps } from "~/types/claimreview.types";
import {
  processAuthor,
  processClaim,
  processClaimReviewRating,
} from "~/utils/processors";

export default function ClaimReviewJsonLd({
  scriptId,
  scriptKey,
  claimReviewed,
  reviewRating,
  url,
  author,
  itemReviewed,
}: ClaimReviewJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "ClaimReview",
    claimReviewed,
    reviewRating: processClaimReviewRating(reviewRating),
    url,
    ...(author && { author: processAuthor(author) }),
    ...(itemReviewed && { itemReviewed: processClaim(itemReviewed) }),
  };

  return (
    <JsonLdScript
      data={data}
      id={scriptId}
      scriptKey={scriptKey || "claimreview-jsonld"}
    />
  );
}

export type { ClaimReviewJsonLdProps };
