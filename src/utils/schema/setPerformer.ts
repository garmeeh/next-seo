import { Performer } from '../../types';

export function setPerformer(performer?: Performer) {
  if (performer) {
    return {
      ...performer,
      '@type': 'PerformingGroup',
    };
  }

  return undefined;
}
