import type { OpenGraphMedia } from "../types";

/**
 * Process OpenGraph media items (images, videos, audio)
 * Handles default dimensions and generates proper meta tags
 */
export function processOpenGraphMedia(
  mediaType: "image" | "video" | "audio",
  media: ReadonlyArray<OpenGraphMedia> = [],
  defaults?: { width?: number; height?: number },
) {
  const tags: Array<{ property: string; content: string }> = [];

  media.forEach((item) => {
    // Main media URL
    tags.push({
      property: `og:${mediaType}`,
      content: item.url,
    });

    // Alt text for images
    if (item.alt) {
      tags.push({
        property: `og:${mediaType}:alt`,
        content: item.alt,
      });
    }

    // Secure URL
    if (item.secureUrl) {
      tags.push({
        property: `og:${mediaType}:secure_url`,
        content: item.secureUrl,
      });
    }

    // Media type
    if (item.type) {
      tags.push({
        property: `og:${mediaType}:type`,
        content: item.type,
      });
    }

    // Width
    const width = item.width || defaults?.width;
    if (width) {
      tags.push({
        property: `og:${mediaType}:width`,
        content: width.toString(),
      });
    }

    // Height
    const height = item.height || defaults?.height;
    if (height) {
      tags.push({
        property: `og:${mediaType}:height`,
        content: height.toString(),
      });
    }
  });

  return tags;
}

/**
 * Build robots meta content string from properties
 */
export function buildRobotsContent(
  noindex?: boolean,
  nofollow?: boolean,
  robotsProps?: {
    nosnippet?: boolean;
    maxSnippet?: number;
    maxImagePreview?: string;
    maxVideoPreview?: number;
    noarchive?: boolean;
    unavailableAfter?: string;
    noimageindex?: boolean;
    notranslate?: boolean;
  },
): string {
  const parts: string[] = [];

  // Index/follow directives
  parts.push(noindex ? "noindex" : "index");
  parts.push(nofollow ? "nofollow" : "follow");

  // Additional robots properties
  if (robotsProps) {
    if (robotsProps.nosnippet) parts.push("nosnippet");
    if (robotsProps.maxSnippet !== undefined) {
      parts.push(`max-snippet:${robotsProps.maxSnippet}`);
    }
    if (robotsProps.maxImagePreview) {
      parts.push(`max-image-preview:${robotsProps.maxImagePreview}`);
    }
    if (robotsProps.noarchive) parts.push("noarchive");
    if (robotsProps.unavailableAfter) {
      parts.push(`unavailable_after:${robotsProps.unavailableAfter}`);
    }
    if (robotsProps.noimageindex) parts.push("noimageindex");
    if (robotsProps.maxVideoPreview !== undefined) {
      parts.push(`max-video-preview:${robotsProps.maxVideoPreview}`);
    }
    if (robotsProps.notranslate) parts.push("notranslate");
  }

  return parts.join(",");
}

/**
 * Process title with template
 */
export function processTitle(
  title?: string,
  defaultTitle?: string,
  titleTemplate?: string,
): string | undefined {
  let finalTitle = title || defaultTitle;

  if (!finalTitle) return undefined;

  if (title && titleTemplate) {
    finalTitle = titleTemplate.replace(/%s/g, title);
  }

  return finalTitle;
}

/**
 * Generate unique key for meta/link tags
 */
export function generateTagKey(tag: {
  name?: string;
  property?: string;
  httpEquiv?: string;
  keyOverride?: string;
}): string {
  return tag.keyOverride || tag.name || tag.property || tag.httpEquiv || "";
}
