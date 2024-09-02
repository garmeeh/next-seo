import { PriceSpecification } from '../../types';

export function setCost(cost?: PriceSpecification) {
  if (cost) {
    return {
      ...cost,
      '@type': 'MonetaryAmount',
    };
  }
  return undefined;
}
