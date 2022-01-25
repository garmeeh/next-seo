import { ContactPoint } from 'src/types';

export function setContactPoint(contactPoint: ContactPoint) {
  if (contactPoint) {
    return {
      ...contactPoint,
      '@type': 'ContactPoint',
    };
  }

  return undefined;
}
