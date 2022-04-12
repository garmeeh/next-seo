import { CreativeWork } from '../../types';

export function setCreativeWork(creativeWork: CreativeWork) {
  if (creativeWork) {
    return {
      ...creativeWork,
      '@type': 'CreativeWork',
    };
  }

  return undefined;
}
