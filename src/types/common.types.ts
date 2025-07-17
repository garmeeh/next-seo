// Base Schema.org types (e.g., Thing, Person)
// This file will contain common TypeScript definitions based on Schema.org.

export interface Thing {
  name?: string;
  description?: string;
  url?: string;
  image?: string;
}

export interface ImageObject {
  "@type": "ImageObject";
  url: string;
  width?: number;
  height?: number;
  caption?: string;
}

export interface Person extends Thing {
  "@type": "Person";
  familyName?: string;
  givenName?: string;
  additionalName?: string;
}

export interface Organization extends Thing {
  "@type": "Organization";
  logo?: string | ImageObject;
}

export type Author = string | Person | Organization;
