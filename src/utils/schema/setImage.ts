export function setImage(image?: string) {
  if (image) {
    return { '@type': 'ImageObject', url: image };
  }
  return undefined;
}
