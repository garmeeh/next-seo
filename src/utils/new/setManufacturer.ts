import { setImage } from './setImage';

interface Manufacturer {
  manufacturerName?: string;
  manufacturerLogo?: string;
}

export function setManufacturer(manufacturer?: Manufacturer) {
  if (
    manufacturer &&
    (manufacturer.manufacturerName || manufacturer.manufacturerLogo)
  ) {
    return {
      '@type': 'Organization',
      name: manufacturer.manufacturerName,
      logo: setImage(manufacturer.manufacturerLogo),
    };
  }
  return undefined;
}
