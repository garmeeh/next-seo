import { Location, Place, VirtualLocation } from 'src/types';
import { setAddress } from './setAddress';

export function setLocation(location: Location) {
  if (!location) {
    return undefined;
  }

  if ('url' in location) {
    return setVirtualLocation(location);
  } else {
    return setPlace(location);
  }
}

function setVirtualLocation(location: VirtualLocation) {
  return {
    ...location,
    '@type': 'VirtualLocation',
  };
}

function setPlace(location: Place) {
  return {
    ...location,
    address: setAddress(location.address),
    '@type': 'Place',
  };
}
