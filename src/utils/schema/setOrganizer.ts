import { Organizer } from 'src/types';

export function setOrganizer(organizer?: Organizer) {
  if (organizer) {
    const { type, ...restOrganizer } = organizer;
    return {
      ...restOrganizer,
      '@type': type || 'Person',
    };
  }

  return undefined;
}
