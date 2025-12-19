import type {
  ImageObject,
  QuantitativeValue,
  SimpleMonetaryAmount,
  VideoObject,
} from "./common.types";

/**
 * HowToSupply - A supply consumed when performing instructions
 * @see https://schema.org/HowToSupply
 */
export interface HowToSupply {
  "@type": "HowToSupply";
  name: string;
  image?: string | ImageObject | Omit<ImageObject, "@type">;
  requiredQuantity?:
    | number
    | string
    | QuantitativeValue
    | Omit<QuantitativeValue, "@type">;
  estimatedCost?:
    | string
    | SimpleMonetaryAmount
    | Omit<SimpleMonetaryAmount, "@type">;
}

/**
 * HowToTool - An object used (but not consumed) when performing instructions
 * @see https://schema.org/HowToTool
 */
export interface HowToTool {
  "@type": "HowToTool";
  name: string;
  image?: string | ImageObject | Omit<ImageObject, "@type">;
  requiredQuantity?:
    | number
    | string
    | QuantitativeValue
    | Omit<QuantitativeValue, "@type">;
}

/**
 * HowToDirection - A direction or instruction within a HowToStep
 * @see https://schema.org/HowToDirection
 */
export interface HowToDirection {
  "@type": "HowToDirection";
  text: string;
  position?: number;
  beforeMedia?: string | ImageObject | Omit<ImageObject, "@type">;
  afterMedia?: string | ImageObject | Omit<ImageObject, "@type">;
  duringMedia?: string | ImageObject | Omit<ImageObject, "@type">;
}

/**
 * HowToTip - A tip or suggestion within a HowToStep
 * @see https://schema.org/HowToTip
 */
export interface HowToTip {
  "@type": "HowToTip";
  text: string;
  position?: number;
}

/**
 * HowToStep - A step in a HowTo guide
 * @see https://schema.org/HowToStep
 */
export interface HowToStep {
  "@type": "HowToStep";
  name?: string;
  text?: string;
  url?: string;
  image?: string | ImageObject | Omit<ImageObject, "@type">;
  position?: number;
  itemListElement?: (
    | HowToDirection
    | HowToTip
    | Omit<HowToDirection, "@type">
    | Omit<HowToTip, "@type">
  )[];
}

/**
 * HowToSection - A section of steps within a HowTo guide
 * @see https://schema.org/HowToSection
 */
export interface HowToSection {
  "@type": "HowToSection";
  name: string;
  position?: number;
  itemListElement: (HowToStep | Omit<HowToStep, "@type">)[];
}

/**
 * Step type union - represents all valid step types
 */
export type Step =
  | string
  | HowToStep
  | HowToSection
  | Omit<HowToStep, "@type">
  | Omit<HowToSection, "@type">;

/**
 * Supply type union - flexible input for supplies
 */
export type Supply = string | HowToSupply | Omit<HowToSupply, "@type">;

/**
 * Tool type union - flexible input for tools
 */
export type Tool = string | HowToTool | Omit<HowToTool, "@type">;

/**
 * EstimatedCost type union - flexible input for cost
 */
export type EstimatedCost =
  | string
  | SimpleMonetaryAmount
  | Omit<SimpleMonetaryAmount, "@type">;

/**
 * Yield type union - flexible input for yield/result quantity
 */
export type HowToYield =
  | string
  | QuantitativeValue
  | Omit<QuantitativeValue, "@type">;

/**
 * HowTo - Instructions that explain how to achieve a result
 * @see https://schema.org/HowTo
 */
export interface HowTo {
  "@type": "HowTo";
  name: string;
  description?: string;
  image?: string | ImageObject | Omit<ImageObject, "@type">;
  estimatedCost?: EstimatedCost;
  performTime?: string;
  prepTime?: string;
  totalTime?: string;
  step?: Step | Step[];
  supply?: Supply | Supply[];
  tool?: Tool | Tool[];
  yield?: HowToYield;
  video?: VideoObject | Omit<VideoObject, "@type">;
}

/**
 * Props for the HowToJsonLd component
 */
export type HowToJsonLdProps = Omit<HowTo, "@type"> & {
  scriptId?: string;
  scriptKey?: string;
};
