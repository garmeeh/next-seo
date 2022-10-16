import type { ContactPoint } from 'src/types';
import { setContactPoint } from './setContactPoint';

export function setContactPoints(contactPoint: ContactPoint[] | ContactPoint) {
  if (Array.isArray(contactPoint)) {
    return contactPoint.map(setContactPoint);
  }

  return setContactPoint(contactPoint);
}
