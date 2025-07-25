import type { Author, GeoCoordinates } from "./common.types";

// Base types needed for Dataset

export interface GeoShape {
  "@type": "GeoShape";
  box?: string;
  circle?: string;
  line?: string;
  polygon?: string;
}

export interface PropertyValue {
  "@type": "PropertyValue";
  name?: string;
  value?: string;
  propertyID?: string;
}

export interface CreativeWork {
  "@type": "CreativeWork";
  name?: string;
  url?: string;
  identifier?: string;
}

// Place type specifically for Dataset (more comprehensive than event Place)
export interface DatasetPlace {
  "@type": "Place";
  name?: string;
  geo?:
    | GeoCoordinates
    | GeoShape
    | Omit<GeoCoordinates, "@type">
    | Omit<GeoShape, "@type">;
}

// DataDownload for distribution
export interface DataDownload {
  "@type": "DataDownload";
  contentUrl: string;
  encodingFormat?: string;
  contentSize?: string;
  name?: string;
  description?: string;
}

// DataCatalog for includedInDataCatalog
export interface DataCatalog {
  "@type": "DataCatalog";
  name: string;
  description?: string;
  url?: string;
  hasPart?: Dataset | Dataset[];
}

// Main Dataset interface
export interface Dataset {
  "@type": "Dataset";
  name: string;
  description: string;
  url?: string;
  sameAs?: string | string[];
  identifier?:
    | string
    | PropertyValue
    | Omit<PropertyValue, "@type">
    | (string | PropertyValue | Omit<PropertyValue, "@type">)[];
  keywords?: string | string[];
  license?: string | CreativeWork | Omit<CreativeWork, "@type">;
  isAccessibleForFree?: boolean;
  hasPart?: Dataset | Dataset[];
  isPartOf?: string | Dataset;
  creator?: Author | Author[];
  funder?: Author | Author[];
  includedInDataCatalog?: DataCatalog | Omit<DataCatalog, "@type">;
  distribution?:
    | DataDownload
    | Omit<DataDownload, "@type">
    | (DataDownload | Omit<DataDownload, "@type">)[];
  temporalCoverage?: string;
  spatialCoverage?: string | DatasetPlace | Omit<DatasetPlace, "@type">;
  alternateName?: string | string[];
  citation?:
    | string
    | CreativeWork
    | Omit<CreativeWork, "@type">
    | (string | CreativeWork | Omit<CreativeWork, "@type">)[];
  measurementTechnique?: string | string[];
  variableMeasured?:
    | string
    | PropertyValue
    | Omit<PropertyValue, "@type">
    | (string | PropertyValue | Omit<PropertyValue, "@type">)[];
  version?: string | number;
}

// Component props type
export type DatasetJsonLdProps = Omit<Dataset, "@type"> & {
  scriptId?: string;
  scriptKey?: string;
};
