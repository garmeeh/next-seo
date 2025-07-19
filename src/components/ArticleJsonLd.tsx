import { JsonLdScript } from "~/core/JsonLdScript";
import type { ArticleJsonLdProps } from "~/types/article.types";
import {
  processAuthor,
  processImage,
  processPublisher,
} from "~/utils/processors";

export default function ArticleJsonLd({
  type = "Article",
  scriptId,
  scriptKey,
  headline,
  url,
  author,
  datePublished,
  dateModified,
  image,
  publisher,
  description,
  isAccessibleForFree,
  mainEntityOfPage,
}: ArticleJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": type,
    headline,
    ...(url && { url }),
    ...(author && {
      author: Array.isArray(author)
        ? author.map(processAuthor)
        : processAuthor(author),
    }),
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    // If dateModified is not provided but datePublished is, use datePublished
    ...(!dateModified && datePublished && { dateModified: datePublished }),
    ...(image && {
      image: Array.isArray(image)
        ? image.map(processImage)
        : processImage(image),
    }),
    ...(publisher && { publisher: processPublisher(publisher) }),
    ...(description && { description }),
    ...(isAccessibleForFree !== undefined && { isAccessibleForFree }),
    ...(mainEntityOfPage && { mainEntityOfPage }),
  };

  return (
    <JsonLdScript
      data={data}
      id={scriptId}
      scriptKey={scriptKey || `article-jsonld-${type}`}
    />
  );
}

export type { ArticleJsonLdProps };
