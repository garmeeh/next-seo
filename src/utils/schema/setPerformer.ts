import { Performer } from '../../types';

export function setPerformer(performer?: Performer) {
  if (performer) {
    const { type, ...restPerformer } = performer;
    return {
      ...restPerformer,
      '@type': type || 'PerformingGroup',
    };
  }

  return undefined;
}
