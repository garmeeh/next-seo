import { Address } from '../../types';

export function setAddress(address?: Address) {
  if (address) {
    return {
      '@type': 'PostalAddress',
      ...address,
    };
  }

  return undefined;
}
