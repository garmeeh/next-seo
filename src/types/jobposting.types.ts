import type {
  Organization,
  PostalAddress,
  QuantitativeValue,
} from "./common.types";

// Administrative area types for applicant location requirements
export interface Country {
  "@type": "Country";
  name: string;
}

export interface State {
  "@type": "State";
  name: string;
}

export type AdministrativeArea = Country | State;

// Place type for job location
export interface Place {
  "@type": "Place";
  address?: string | PostalAddress | Omit<PostalAddress, "@type">;
}

// PropertyValue for identifier
export interface PropertyValue {
  "@type": "PropertyValue";
  name?: string;
  value?: string;
}

// MonetaryAmount for salary
export interface MonetaryAmount {
  "@type": "MonetaryAmount";
  currency: string;
  value: QuantitativeValue | Omit<QuantitativeValue, "@type">;
}

// Education requirements
export interface EducationalOccupationalCredential {
  "@type": "EducationalOccupationalCredential";
  credentialCategory?: string;
}

// Experience requirements
export interface OccupationalExperienceRequirements {
  "@type": "OccupationalExperienceRequirements";
  monthsOfExperience?: number;
}

// Employment type enum values
export type EmploymentType =
  | "FULL_TIME"
  | "PART_TIME"
  | "CONTRACTOR"
  | "TEMPORARY"
  | "INTERN"
  | "VOLUNTEER"
  | "PER_DIEM"
  | "OTHER";

// Job location type for remote work
export type JobLocationType = "TELECOMMUTE";

// Base interface for JobPosting
export interface JobPostingBase {
  title: string;
  description: string;
  datePosted: string;
  hiringOrganization: string | Organization | Omit<Organization, "@type">;
  jobLocation?:
    | string
    | Place
    | Omit<Place, "@type">
    | (string | Place | Omit<Place, "@type">)[];
  url?: string;
  validThrough?: string;
  employmentType?: EmploymentType | EmploymentType[];
  identifier?: string | PropertyValue | Omit<PropertyValue, "@type">;
  baseSalary?: MonetaryAmount | Omit<MonetaryAmount, "@type">;
  applicantLocationRequirements?:
    | Omit<Country, "@type">
    | Omit<State, "@type">
    | Country
    | State
    | (Omit<Country, "@type"> | Omit<State, "@type"> | Country | State)[];
  jobLocationType?: JobLocationType;
  directApply?: boolean;
  educationRequirements?:
    | string
    | EducationalOccupationalCredential
    | Omit<EducationalOccupationalCredential, "@type">
    | (
        | string
        | EducationalOccupationalCredential
        | Omit<EducationalOccupationalCredential, "@type">
      )[];
  experienceRequirements?:
    | string
    | OccupationalExperienceRequirements
    | Omit<OccupationalExperienceRequirements, "@type">;
  experienceInPlaceOfEducation?: boolean;
}

// JobPosting with @type
export interface JobPosting extends JobPostingBase {
  "@type": "JobPosting";
}

// Component props type
export type JobPostingJsonLdProps = Omit<JobPostingBase, "@type"> & {
  scriptId?: string;
  scriptKey?: string;
};
