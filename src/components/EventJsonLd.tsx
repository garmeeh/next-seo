import { JsonLdScript } from "~/core/JsonLdScript";
import type { EventJsonLdProps } from "~/types/event.types";
import {
  processImage,
  processPlace,
  processPerformer,
  processOrganizer,
  processOffer,
} from "~/utils/processors";

export default function EventJsonLd({
  scriptId,
  scriptKey,
  name,
  startDate,
  location,
  endDate,
  description,
  eventStatus,
  image,
  offers,
  performer,
  organizer,
  previousStartDate,
  url,
}: EventJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Event",
    name,
    startDate,
    location: processPlace(location),
    ...(endDate && { endDate }),
    ...(description && { description }),
    ...(eventStatus && { eventStatus }),
    ...(image && {
      image: Array.isArray(image)
        ? image.map(processImage)
        : processImage(image),
    }),
    ...(offers && {
      offers: Array.isArray(offers)
        ? offers.map(processOffer)
        : processOffer(offers),
    }),
    ...(performer && {
      performer: Array.isArray(performer)
        ? performer.map(processPerformer)
        : processPerformer(performer),
    }),
    ...(organizer && {
      organizer: processOrganizer(organizer),
    }),
    ...(previousStartDate && { previousStartDate }),
    ...(url && { url }),
  };

  return (
    <JsonLdScript
      data={data}
      id={scriptId}
      scriptKey={scriptKey || "event-jsonld"}
    />
  );
}

export type { EventJsonLdProps };
