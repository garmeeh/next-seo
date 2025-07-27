import type { Person, Organization } from "./common.types";

// ProfilePage structured data type
export interface ProfilePage {
  "@type": "ProfilePage";
  "@context": "https://schema.org";
  mainEntity: Person | Organization;
  dateCreated?: string;
  dateModified?: string;
  hasPart?: unknown[]; // For including recent activity
}

// Props for the component - mainEntity can be a string, object without @type, or with @type
export type ProfilePageJsonLdProps = {
  mainEntity:
    | string
    | Person
    | Organization
    | Omit<Person, "@type">
    | Omit<Organization, "@type">;
  dateCreated?: string;
  dateModified?: string;
  scriptId?: string;
  scriptKey?: string;
};
