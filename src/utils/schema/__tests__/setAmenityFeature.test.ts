import { AmenityFeature, DecoratedAmenityFeature } from 'src/types';
import { setAmenityFeature } from '../setAmenityFeature';

const amenityFeatureEx1: AmenityFeature = {
  name: 'Shower',
  value: true,
};

const decoratedAmenityFeatureEx1: DecoratedAmenityFeature = {
  '@type': 'LocationFeatureSpecification',
  ...amenityFeatureEx1,
};

const amenityFeatureEx2: AmenityFeature[] = [
  {
    name: 'Showers',
    value: true,
  },
  {
    name: 'RV Hookup',
    value: false,
  },
  {
    name: 'Campfire',
    value: true,
  },
];

const decoratedAmenityFeatureEx2: DecoratedAmenityFeature[] =
  amenityFeatureEx2.map(amenity => ({
    '@type': 'LocationFeatureSpecification',
    ...amenity,
  }));

describe('setAmenityFeature', () => {
  test('should return undefined if amenityFeature is undefined', () => {
    const data = setAmenityFeature(undefined);
    expect(data).toBeUndefined();
  });

  test('should accept an object, decorates it, and returns it', () => {
    const data = setAmenityFeature(amenityFeatureEx1);
    expect(data).toEqual(decoratedAmenityFeatureEx1);
  });

  test('should accept an array of objects, decorates all of them, and returns it', () => {
    const data = setAmenityFeature(amenityFeatureEx2);
    expect(data).toEqual(decoratedAmenityFeatureEx2);
  });

  test('single object array  returns correctly', () => {
    const data = setAmenityFeature([amenityFeatureEx1]);
    expect(data).toEqual(decoratedAmenityFeatureEx1);
  });
});
