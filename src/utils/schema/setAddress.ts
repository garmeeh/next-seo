import { Address } from 'src/types';

export function setAddress(address?: Address | Address[]) {
  if (!address) return undefined;

  // If array of one address, replace with single address
  if (Array.isArray(address) && address.length === 1) address = address[0];

  // If array, return mapped array of PostalAddresses
  if (Array.isArray(address)) return address.map(toPostalAddress);

  // Return single PostalAddress
  return toPostalAddress(address);
}

function toPostalAddress(address: Address) {
  return { '@type': 'PostalAddress', ...address };
}
