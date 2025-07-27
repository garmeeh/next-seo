import type {
  ImageObject,
  Organization,
  Author,
  AggregateRating,
  Review,
} from "./common.types";
import type { Offer } from "./event.types";

// Base interface with common properties for all software applications
export interface SoftwareApplicationBase {
  name?: string;
  description?: string;
  url?: string;
  image?:
    | string
    | ImageObject
    | Omit<ImageObject, "@type">
    | (string | ImageObject | Omit<ImageObject, "@type">)[];
  applicationCategory?: string;
  applicationSubCategory?: string;
  applicationSuite?: string;
  operatingSystem?: string;
  memoryRequirements?: string;
  processorRequirements?: string;
  storageRequirements?: string;
  availableOnDevice?: string;
  downloadUrl?: string;
  installUrl?: string;
  countriesSupported?: string | string[];
  countriesNotSupported?: string | string[];
  permissions?: string | string[];
  softwareVersion?: string;
  releaseNotes?: string;
  screenshot?:
    | string
    | ImageObject
    | Omit<ImageObject, "@type">
    | (string | ImageObject | Omit<ImageObject, "@type">)[];
  featureList?: string | string[];
  offers?: Offer | Omit<Offer, "@type"> | (Offer | Omit<Offer, "@type">)[];
  aggregateRating?: AggregateRating | Omit<AggregateRating, "@type">;
  review?: Review | Omit<Review, "@type"> | (Review | Omit<Review, "@type">)[];
  author?: Author;
  publisher?: Organization | Omit<Organization, "@type">;
  datePublished?: string;
  dateModified?: string;
}

// Specific schema type interfaces
export interface SoftwareApplication extends SoftwareApplicationBase {
  "@type": "SoftwareApplication";
}

export interface MobileApplication extends SoftwareApplicationBase {
  "@type": "MobileApplication";
}

export interface WebApplication extends SoftwareApplicationBase {
  "@type": "WebApplication";
}

export interface VideoGame extends SoftwareApplicationBase {
  "@type": "VideoGame";
}

// Specific application category types
export interface GameApplication extends SoftwareApplicationBase {
  "@type": "GameApplication";
}

export interface SocialNetworkingApplication extends SoftwareApplicationBase {
  "@type": "SocialNetworkingApplication";
}

export interface TravelApplication extends SoftwareApplicationBase {
  "@type": "TravelApplication";
}

export interface ShoppingApplication extends SoftwareApplicationBase {
  "@type": "ShoppingApplication";
}

export interface SportsApplication extends SoftwareApplicationBase {
  "@type": "SportsApplication";
}

export interface LifestyleApplication extends SoftwareApplicationBase {
  "@type": "LifestyleApplication";
}

export interface BusinessApplication extends SoftwareApplicationBase {
  "@type": "BusinessApplication";
}

export interface DesignApplication extends SoftwareApplicationBase {
  "@type": "DesignApplication";
}

export interface DeveloperApplication extends SoftwareApplicationBase {
  "@type": "DeveloperApplication";
}

export interface DriverApplication extends SoftwareApplicationBase {
  "@type": "DriverApplication";
}

export interface EducationalApplication extends SoftwareApplicationBase {
  "@type": "EducationalApplication";
}

export interface HealthApplication extends SoftwareApplicationBase {
  "@type": "HealthApplication";
}

export interface FinanceApplication extends SoftwareApplicationBase {
  "@type": "FinanceApplication";
}

export interface SecurityApplication extends SoftwareApplicationBase {
  "@type": "SecurityApplication";
}

export interface BrowserApplication extends SoftwareApplicationBase {
  "@type": "BrowserApplication";
}

export interface CommunicationApplication extends SoftwareApplicationBase {
  "@type": "CommunicationApplication";
}

export interface DesktopEnhancementApplication extends SoftwareApplicationBase {
  "@type": "DesktopEnhancementApplication";
}

export interface EntertainmentApplication extends SoftwareApplicationBase {
  "@type": "EntertainmentApplication";
}

export interface MultimediaApplication extends SoftwareApplicationBase {
  "@type": "MultimediaApplication";
}

export interface HomeApplication extends SoftwareApplicationBase {
  "@type": "HomeApplication";
}

export interface UtilitiesApplication extends SoftwareApplicationBase {
  "@type": "UtilitiesApplication";
}

export interface ReferenceApplication extends SoftwareApplicationBase {
  "@type": "ReferenceApplication";
}

// Type for VideoGame co-typed with another application type
export type VideoGameCoTyped =
  | ["VideoGame", "MobileApplication"]
  | ["VideoGame", "WebApplication"]
  | ["VideoGame", "SoftwareApplication"];

// All possible application types
export type ApplicationType =
  | "SoftwareApplication"
  | "MobileApplication"
  | "WebApplication"
  | "GameApplication"
  | "SocialNetworkingApplication"
  | "TravelApplication"
  | "ShoppingApplication"
  | "SportsApplication"
  | "LifestyleApplication"
  | "BusinessApplication"
  | "DesignApplication"
  | "DeveloperApplication"
  | "DriverApplication"
  | "EducationalApplication"
  | "HealthApplication"
  | "FinanceApplication"
  | "SecurityApplication"
  | "BrowserApplication"
  | "CommunicationApplication"
  | "DesktopEnhancementApplication"
  | "EntertainmentApplication"
  | "MultimediaApplication"
  | "HomeApplication"
  | "UtilitiesApplication"
  | "ReferenceApplication";

// Component props type
export type SoftwareApplicationJsonLdProps = (
  | Omit<SoftwareApplication, "@type">
  | Omit<MobileApplication, "@type">
  | Omit<WebApplication, "@type">
  | Omit<GameApplication, "@type">
  | Omit<SocialNetworkingApplication, "@type">
  | Omit<TravelApplication, "@type">
  | Omit<ShoppingApplication, "@type">
  | Omit<SportsApplication, "@type">
  | Omit<LifestyleApplication, "@type">
  | Omit<BusinessApplication, "@type">
  | Omit<DesignApplication, "@type">
  | Omit<DeveloperApplication, "@type">
  | Omit<DriverApplication, "@type">
  | Omit<EducationalApplication, "@type">
  | Omit<HealthApplication, "@type">
  | Omit<FinanceApplication, "@type">
  | Omit<SecurityApplication, "@type">
  | Omit<BrowserApplication, "@type">
  | Omit<CommunicationApplication, "@type">
  | Omit<DesktopEnhancementApplication, "@type">
  | Omit<EntertainmentApplication, "@type">
  | Omit<MultimediaApplication, "@type">
  | Omit<HomeApplication, "@type">
  | Omit<UtilitiesApplication, "@type">
  | Omit<ReferenceApplication, "@type">
) & {
  type?: ApplicationType | VideoGameCoTyped;
  scriptId?: string;
  scriptKey?: string;
};
