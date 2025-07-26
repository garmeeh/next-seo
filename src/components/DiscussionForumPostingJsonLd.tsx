import { JsonLdScript } from "~/core/JsonLdScript";
import type { DiscussionForumPostingJsonLdProps } from "~/types/discussionforum.types";
import {
  processAuthor,
  processImage,
  processVideo,
  processComment,
  processInteractionStatistic,
  processSharedContent,
  processIsPartOf,
} from "~/utils/processors";

export default function DiscussionForumPostingJsonLd({
  type = "DiscussionForumPosting",
  scriptId,
  scriptKey,
  headline,
  text,
  image,
  video,
  author,
  datePublished,
  dateModified,
  url,
  comment,
  creativeWorkStatus,
  interactionStatistic,
  isPartOf,
  sharedContent,
}: DiscussionForumPostingJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": type,
    ...(headline && { headline }),
    ...(text && { text }),
    ...(image && {
      image: Array.isArray(image)
        ? image.map(processImage)
        : processImage(image),
    }),
    ...(video && { video: processVideo(video) }),
    author: Array.isArray(author)
      ? author.map(processAuthor)
      : processAuthor(author),
    datePublished,
    ...(dateModified && { dateModified }),
    ...(url && { url }),
    ...(comment && {
      comment: comment.map(processComment),
    }),
    ...(creativeWorkStatus && { creativeWorkStatus }),
    ...(interactionStatistic && {
      interactionStatistic: Array.isArray(interactionStatistic)
        ? interactionStatistic.map(processInteractionStatistic)
        : processInteractionStatistic(interactionStatistic),
    }),
    ...(isPartOf && { isPartOf: processIsPartOf(isPartOf) }),
    ...(sharedContent && {
      sharedContent: processSharedContent(sharedContent),
    }),
  };

  return (
    <JsonLdScript
      data={data}
      id={scriptId}
      scriptKey={scriptKey || `${type.toLowerCase()}-jsonld`}
    />
  );
}

export type { DiscussionForumPostingJsonLdProps };
