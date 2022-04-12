import { Geo } from '../../types';

export function setGeo(geo?: Geo) {
  if (geo) {
    return {
      ...geo,
      '@type': 'GeoCoordinates',
    };
  }

  return undefined;
}
