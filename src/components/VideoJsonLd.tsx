import { JsonLdScript } from "~/core/JsonLdScript";
import type { VideoJsonLdProps } from "~/types/video.types";
import {
  processAuthor,
  processImage,
  processInteractionStatistic,
  processPublisher,
  processBroadcastEvent,
  processClip,
  processSeekToAction,
} from "~/utils/processors";

export default function VideoJsonLd({
  type = "VideoObject",
  scriptId,
  scriptKey,
  name,
  description,
  thumbnailUrl,
  uploadDate,
  contentUrl,
  embedUrl,
  duration,
  expires,
  interactionStatistic,
  regionsAllowed,
  ineligibleRegion,
  publication,
  hasPart,
  potentialAction,
  author,
  publisher,
}: VideoJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": type,
    name,
    description,
    thumbnailUrl: Array.isArray(thumbnailUrl)
      ? thumbnailUrl.map(processImage)
      : processImage(thumbnailUrl),
    uploadDate,
    ...(contentUrl && { contentUrl }),
    ...(embedUrl && { embedUrl }),
    ...(duration && { duration }),
    ...(expires && { expires }),
    ...(interactionStatistic && {
      interactionStatistic: Array.isArray(interactionStatistic)
        ? interactionStatistic.map(processInteractionStatistic)
        : processInteractionStatistic(interactionStatistic),
    }),
    ...(regionsAllowed && {
      regionsAllowed: Array.isArray(regionsAllowed)
        ? regionsAllowed
        : [regionsAllowed],
    }),
    ...(ineligibleRegion && {
      ineligibleRegion: Array.isArray(ineligibleRegion)
        ? ineligibleRegion
        : [ineligibleRegion],
    }),
    ...(publication && {
      publication: Array.isArray(publication)
        ? publication.map(processBroadcastEvent)
        : processBroadcastEvent(publication),
    }),
    ...(hasPart && {
      hasPart: Array.isArray(hasPart)
        ? hasPart.map(processClip)
        : processClip(hasPart),
    }),
    ...(potentialAction && {
      potentialAction: processSeekToAction(potentialAction),
    }),
    ...(author && {
      author: Array.isArray(author)
        ? author.map(processAuthor)
        : processAuthor(author),
    }),
    ...(publisher && { publisher: processPublisher(publisher) }),
  };

  return (
    <JsonLdScript
      data={data}
      id={scriptId}
      scriptKey={scriptKey || `video-jsonld-${type}`}
    />
  );
}

export type { VideoJsonLdProps };
