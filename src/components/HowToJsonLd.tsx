import { JsonLdScript } from "~/core/JsonLdScript";
import type { HowToJsonLdProps } from "~/types/howto.types";
import {
  processImage,
  processVideo,
  processStep,
  processHowToSupply,
  processHowToTool,
  processEstimatedCost,
  processHowToYield,
} from "~/utils/processors";

export default function HowToJsonLd({
  scriptId,
  scriptKey,
  name,
  description,
  image,
  estimatedCost,
  performTime,
  prepTime,
  totalTime,
  step,
  supply,
  tool,
  yield: yieldValue,
  video,
}: HowToJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    ...(description && { description }),
    ...(image && {
      image: Array.isArray(image)
        ? image.map(processImage)
        : processImage(image),
    }),
    ...(estimatedCost && {
      estimatedCost: processEstimatedCost(estimatedCost),
    }),
    ...(performTime && { performTime }),
    ...(prepTime && { prepTime }),
    ...(totalTime && { totalTime }),
    ...(step && {
      step: Array.isArray(step) ? step.map(processStep) : processStep(step),
    }),
    ...(supply && {
      supply: Array.isArray(supply)
        ? supply.map(processHowToSupply)
        : processHowToSupply(supply),
    }),
    ...(tool && {
      tool: Array.isArray(tool)
        ? tool.map(processHowToTool)
        : processHowToTool(tool),
    }),
    ...(yieldValue && { yield: processHowToYield(yieldValue) }),
    ...(video && { video: processVideo(video) }),
  };

  return (
    <JsonLdScript
      data={data}
      id={scriptId}
      scriptKey={scriptKey || "howto-jsonld"}
    />
  );
}

export type { HowToJsonLdProps };
