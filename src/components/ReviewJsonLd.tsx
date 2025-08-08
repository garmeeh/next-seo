import { JsonLdScript } from "~/core/JsonLdScript";
import type { ReviewJsonLdProps } from "~/types/review.types";
import {
  processAuthor,
  processItemReviewed,
  processMainEntityOfPage,
  processPublisher,
} from "~/utils/processors";

export default function ReviewJsonLd({
  scriptId,
  scriptKey,
  author,
  reviewRating,
  itemReviewed,
  datePublished,
  reviewBody,
  publisher,
  url,
  mainEntityOfPage,
}: ReviewJsonLdProps) {
  if (!author) {
    throw new Error("Review requires an author");
  }
  const ratingValue =
    typeof reviewRating === "object" && reviewRating
      ? (reviewRating as { ratingValue?: unknown }).ratingValue
      : undefined;
  if (ratingValue === undefined) {
    throw new Error("Review requires reviewRating.ratingValue");
  }
  if (!itemReviewed) {
    throw new Error("Review requires itemReviewed when used standalone");
  }

  const data = {
    "@context": "https://schema.org",
    "@type": "Review",
    author: processAuthor(author),
    reviewRating: {
      "@type": "Rating",
      ...reviewRating,
    },
    itemReviewed: processItemReviewed(itemReviewed),
    ...(datePublished && { datePublished }),
    ...(reviewBody && { reviewBody }),
    ...(publisher && { publisher: processPublisher(publisher) }),
    ...(url && { url }),
    ...(mainEntityOfPage && {
      mainEntityOfPage: processMainEntityOfPage(mainEntityOfPage),
    }),
  } as const;

  return (
    <JsonLdScript
      data={data}
      id={scriptId}
      scriptKey={scriptKey || "review-jsonld"}
    />
  );
}

export type { ReviewJsonLdProps };
