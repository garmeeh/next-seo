import { AmenityFeature, DecoratedAmenityFeature } from 'src/types';

export function setAmenityFeature(
  amenityFeature?: AmenityFeature | AmenityFeature[],
) {
  if (!amenityFeature) return undefined;

  if (!Array.isArray(amenityFeature)) {
    return decorateAmenityFeature(amenityFeature);
  }

  if (amenityFeature.length === 1) {
    return decorateAmenityFeature(amenityFeature[0]);
  }

  return amenityFeature.map(decorateAmenityFeature);
}

function decorateAmenityFeature(
  amenity: AmenityFeature,
): DecoratedAmenityFeature {
  return {
    '@type': 'LocationFeatureSpecification',
    ...amenity,
  };
}
