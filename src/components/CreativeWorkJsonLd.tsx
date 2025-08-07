import { JsonLdScript } from "~/core/JsonLdScript";
import type { CreativeWorkJsonLdProps } from "~/types/creativework.types";
import {
  processAuthor,
  processImage,
  processPublisher,
  processMainEntityOfPage,
  processWebPageElement,
} from "~/utils/processors";

export default function CreativeWorkJsonLd({
  type = "CreativeWork",
  scriptId,
  scriptKey,
  headline,
  name,
  url,
  author,
  datePublished,
  dateModified,
  image,
  publisher,
  description,
  isAccessibleForFree,
  hasPart,
  mainEntityOfPage,
  // Additional properties for specific types
  text, // For Comment
  provider, // For Course
  itemReviewed, // For Review
  reviewRating, // For Review
}: CreativeWorkJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": type,
    // Use headline if provided, otherwise use name
    ...(headline && { headline }),
    ...(name && !headline && { name }),
    ...(url && { url }),
    ...(author && {
      author: Array.isArray(author)
        ? author.map(processAuthor)
        : processAuthor(author),
    }),
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    // If dateModified is not provided but datePublished is, use datePublished for certain types
    ...(!dateModified &&
      datePublished &&
      ["Article", "NewsArticle", "BlogPosting"].includes(type) && {
        dateModified: datePublished,
      }),
    ...(image && {
      image: Array.isArray(image)
        ? image.map(processImage)
        : processImage(image),
    }),
    ...(publisher && { publisher: processPublisher(publisher) }),
    ...(description && { description }),
    ...(isAccessibleForFree !== undefined && { isAccessibleForFree }),
    ...(hasPart && {
      hasPart: Array.isArray(hasPart)
        ? hasPart.map(processWebPageElement)
        : processWebPageElement(hasPart),
    }),
    ...(mainEntityOfPage && {
      mainEntityOfPage: processMainEntityOfPage(mainEntityOfPage),
    }),
    // Type-specific properties
    ...(text && type === "Comment" && { text }),
    ...(provider &&
      type === "Course" && { provider: processPublisher(provider) }),
    ...(itemReviewed && type === "Review" && { itemReviewed }),
    ...(reviewRating && type === "Review" && { reviewRating }),
  };

  return (
    <JsonLdScript
      data={data}
      id={scriptId}
      scriptKey={scriptKey || `creativework-jsonld-${type.toLowerCase()}`}
    />
  );
}

export type { CreativeWorkJsonLdProps };
