import type { Author } from "./common.types";

// Base interface for image metadata
export interface ImageBase {
  contentUrl: string;
  creator?: Author | Author[];
  creditText?: string;
  copyrightNotice?: string;
  license?: string;
  acquireLicensePage?: string;
}

// Schema.org ImageObject with metadata extensions
export interface ImageMetadata extends ImageBase {
  "@type": "ImageObject";
}

// Component props type - either single image or multiple images
export type ImageJsonLdProps = {
  scriptId?: string;
  scriptKey?: string;
} & (
  | Omit<ImageMetadata, "@type">
  | {
      images: Omit<ImageMetadata, "@type">[];
    }
);
