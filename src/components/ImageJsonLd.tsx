import { JsonLdScript } from "~/core/JsonLdScript";
import type { ImageJsonLdProps, ImageMetadata } from "~/types/image.types";
import { processAuthor } from "~/utils/processors";

export default function ImageJsonLd({
  scriptId,
  scriptKey,
  ...props
}: ImageJsonLdProps) {
  // Helper function to process a single image
  const processImage = (image: Omit<ImageMetadata, "@type">) => {
    // Validate required fields
    const hasRequiredMetadata =
      image.creator ||
      image.creditText ||
      image.copyrightNotice ||
      image.license;

    if (!image.contentUrl || !hasRequiredMetadata) {
      console.warn(
        "ImageJsonLd: contentUrl and at least one of creator, creditText, copyrightNotice, or license is required",
      );
    }

    return {
      "@type": "ImageObject",
      contentUrl: image.contentUrl,
      ...(image.creator && {
        creator: Array.isArray(image.creator)
          ? image.creator.map(processAuthor)
          : processAuthor(image.creator),
      }),
      ...(image.creditText && { creditText: image.creditText }),
      ...(image.copyrightNotice && { copyrightNotice: image.copyrightNotice }),
      ...(image.license && { license: image.license }),
      ...(image.acquireLicensePage && {
        acquireLicensePage: image.acquireLicensePage,
      }),
    };
  };

  // Determine if we have multiple images
  const hasMultipleImages = "images" in props && Array.isArray(props.images);

  const data = hasMultipleImages
    ? props.images.map(processImage)
    : processImage(props as Omit<ImageMetadata, "@type">);

  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        ...(Array.isArray(data) ? {} : data),
        ...(Array.isArray(data) && { "@graph": data }),
      }}
      id={scriptId}
      scriptKey={scriptKey || "image-jsonld"}
    />
  );
}

export type { ImageJsonLdProps };
