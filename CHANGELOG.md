# next-seo

## 7.1.0

### Minor Changes

- d412e2b: Add HowToJsonLd component for structured data support
  - New `HowToJsonLd` component following Schema.org HowTo specification
  - Support for HowToStep, HowToSection, HowToDirection, and HowToTip types
  - HowToSupply and HowToTool for materials and equipment
  - Duration properties (prepTime, performTime, totalTime) in ISO 8601 format
  - estimatedCost as string or MonetaryAmount object
  - yield as string or QuantitativeValue
  - Video support via VideoObject

## 7.0.1

### Patch Changes

- 1db3648: Add JSDoc comment to internal type guard function
