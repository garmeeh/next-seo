import type { ContactPoint } from 'src/types';

export function setContactPoints(contactPoint?: ContactPoint[]) {
  if (contactPoint && contactPoint.length) {
    return contactPoint.map(contactPoint => ({
      '@type': 'ContactPoint',
      ...contactPoint,
    }));
  }

  return undefined;
}
