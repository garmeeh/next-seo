import { Instruction } from '../../types';

export function setInstruction(instruction: Instruction) {
  if (instruction) {
    return {
      ...instruction,
      '@type': 'HowToStep',
    };
  }

  return undefined;
}
