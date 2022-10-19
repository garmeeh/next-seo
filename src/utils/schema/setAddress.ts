import { Address } from 'src/types';

export function setAddress(address?: Address | Address[]) {
  if (!address) return undefined;
  
  if (!Array.isArray(address)) return toPostalAddress(address);

  // If array of one address, replace with single address
  if (address.length === 1) return toPostalAddress(address[0]);

  // If array, return mapped array of PostalAddresses
  return address.map(toPostalAddress);
}

function toPostalAddress(address: Address) {
  return { '@type': 'PostalAddress', ...address };
}
