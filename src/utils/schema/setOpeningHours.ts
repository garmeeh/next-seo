import { OpeningHoursSpecification } from '../../types';

export function setOpeningHours(openingHours?: OpeningHoursSpecification) {
  if (openingHours) {
    return {
      ...openingHours,
      '@type': 'OpeningHoursSpecification',
    };
  }

  return undefined;
}
