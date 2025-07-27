import { JsonLdScript } from "~/core/JsonLdScript";
import type { ProfilePageJsonLdProps } from "~/types/profile.types";
import { processAuthor, processInteractionStatistic } from "~/utils/processors";

export default function ProfilePageJsonLd({
  mainEntity,
  dateCreated,
  dateModified,
  scriptId,
  scriptKey,
}: ProfilePageJsonLdProps) {
  // Process mainEntity - it can be a string, Person, Organization, or objects without @type
  const processedMainEntity = processAuthor(mainEntity);

  // Further process the mainEntity to handle interactionStatistic arrays
  if (processedMainEntity.interactionStatistic) {
    if (Array.isArray(processedMainEntity.interactionStatistic)) {
      processedMainEntity.interactionStatistic =
        processedMainEntity.interactionStatistic.map(
          processInteractionStatistic,
        );
    } else {
      processedMainEntity.interactionStatistic = processInteractionStatistic(
        processedMainEntity.interactionStatistic,
      );
    }
  }

  // Process agentInteractionStatistic if present
  if (processedMainEntity.agentInteractionStatistic) {
    processedMainEntity.agentInteractionStatistic = processInteractionStatistic(
      processedMainEntity.agentInteractionStatistic,
    );
  }

  const data = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: processedMainEntity,
    ...(dateCreated && { dateCreated }),
    ...(dateModified && { dateModified }),
  };

  return (
    <JsonLdScript
      data={data}
      id={scriptId}
      scriptKey={scriptKey || "profile-page-jsonld"}
    />
  );
}

export type { ProfilePageJsonLdProps };
