import { OpeningHoursSpecification } from 'src/types';

export function setOpeningHours(openingHours?: OpeningHoursSpecification) {
  if (openingHours) {
    return {
      ...openingHours,
      '@type': 'OpeningHoursSpecification',
    };
  }

  return undefined;
}
