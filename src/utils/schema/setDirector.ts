export function setDirector(director?: string) {
  if (director) {
    return {
      '@type': 'Person',
      name: director,
    };
  }
  return undefined;
}
