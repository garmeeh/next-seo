import { CreativeWork } from 'src/types';

export function setCreativeWork(creativeWork: CreativeWork) {
  if (creativeWork) {
    return {
      ...creativeWork,
      '@type': 'CreativeWork',
    };
  }

  return undefined;
}
