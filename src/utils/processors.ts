import type {
  Author,
  Person,
  Organization,
  ImageObject,
} from "~/types/common.types";

export function processAuthor(author: Author): Person | Organization {
  if (typeof author === "string") {
    return {
      "@type": "Person",
      name: author,
    };
  }
  return author;
}

export function processImage(
  image: string | ImageObject,
): string | ImageObject {
  if (typeof image === "string") {
    return image;
  }
  return image;
}
