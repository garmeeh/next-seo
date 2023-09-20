import { Step } from '../../types';
import { setImage } from '../../utils/schema/setImage';

export function setStep(step?: Step[]) {
  if (step) {
    return step.map(stepElement => {
      const { itemListElement, image } = stepElement;
      const currentListElements = itemListElement?.map(({ type, text }) => ({
        '@type': type,
        text: text,
      }));
      return {
        ...stepElement,
        '@type': 'HowToStep',
        itemListElement: currentListElements,
        image: setImage(image),
      };
    });
  }

  return undefined;
}
