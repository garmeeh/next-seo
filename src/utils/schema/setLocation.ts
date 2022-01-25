import { Location } from 'src/types';
import { setAddress } from './setAddress';

export function setLocation(location: Location) {
  if (location) {
    return {
      ...location,
      '@type': 'Place',
      address: setAddress(location.address),
    };
  }

  return undefined;
}
