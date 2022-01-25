import { Clip } from 'src/types';

export function setClip(clips?: Clip | Clip[]) {
  function mapClip(clip: Clip) {
    return {
      ...clip,
      '@type': 'Clip',
    };
  }

  if (Array.isArray(clips)) {
    return clips.map(mapClip);
  } else if (clips) {
    return mapClip(clips);
  }

  return undefined;
}
