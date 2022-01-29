import type { BroadcastEvent } from 'src/types';

export function setBroadcastEvent(
  publication?: BroadcastEvent | BroadcastEvent[],
) {
  function mapBroadcastEvent(publication?: BroadcastEvent) {
    return {
      ...publication,
      '@type': 'BroadcastEvent',
    };
  }

  if (publication) {
    if (Array.isArray(publication)) {
      return publication.map(mapBroadcastEvent);
    }
    return mapBroadcastEvent(publication);
  }

  return undefined;
}
