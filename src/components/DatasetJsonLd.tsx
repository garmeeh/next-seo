import { JsonLdScript } from "~/core/JsonLdScript";
import type { DatasetJsonLdProps } from "~/types/dataset.types";
import {
  processCreator,
  processFunder,
  processIdentifier,
  processSpatialCoverage,
  processDataDownload,
  processLicense,
  processDataCatalog,
} from "~/utils/processors";

export default function DatasetJsonLd({
  scriptId,
  scriptKey,
  name,
  description,
  url,
  sameAs,
  identifier,
  keywords,
  license,
  isAccessibleForFree,
  hasPart,
  isPartOf,
  creator,
  funder,
  includedInDataCatalog,
  distribution,
  temporalCoverage,
  spatialCoverage,
  alternateName,
  citation,
  measurementTechnique,
  variableMeasured,
  version,
}: DatasetJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name,
    description,
    ...(url && { url }),
    ...(sameAs && { sameAs }),
    ...(identifier && {
      identifier: Array.isArray(identifier)
        ? identifier.map(processIdentifier)
        : processIdentifier(identifier),
    }),
    ...(keywords && { keywords }),
    ...(license && { license: processLicense(license) }),
    ...(isAccessibleForFree !== undefined && { isAccessibleForFree }),
    ...(hasPart && { hasPart }),
    ...(isPartOf && { isPartOf }),
    ...(creator && { creator: processCreator(creator) }),
    ...(funder && { funder: processFunder(funder) }),
    ...(includedInDataCatalog && {
      includedInDataCatalog: processDataCatalog(includedInDataCatalog),
    }),
    ...(distribution && {
      distribution: Array.isArray(distribution)
        ? distribution.map(processDataDownload)
        : processDataDownload(distribution),
    }),
    ...(temporalCoverage && { temporalCoverage }),
    ...(spatialCoverage && {
      spatialCoverage: processSpatialCoverage(spatialCoverage),
    }),
    ...(alternateName && { alternateName }),
    ...(citation && { citation }),
    ...(measurementTechnique && { measurementTechnique }),
    ...(variableMeasured && {
      variableMeasured: Array.isArray(variableMeasured)
        ? variableMeasured.map((v) =>
            typeof v === "string" ? v : processIdentifier(v),
          )
        : typeof variableMeasured === "string"
          ? variableMeasured
          : processIdentifier(variableMeasured),
    }),
    ...(version && { version }),
  };

  return (
    <JsonLdScript
      data={data}
      id={scriptId}
      scriptKey={scriptKey || "dataset-jsonld"}
    />
  );
}

export type { DatasetJsonLdProps };
