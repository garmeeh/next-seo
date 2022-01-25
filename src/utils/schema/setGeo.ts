import { Geo } from 'src/types';

export function setGeo(geo?: Geo) {
  if (geo) {
    return {
      ...geo,
      '@type': 'GeoCoordinates',
    };
  }

  return undefined;
}
