export function setBrand(brand?: string) {
  if (brand) {
    return {
      '@type': 'Brand',
      name: brand,
    };
  }
  return undefined;
}
