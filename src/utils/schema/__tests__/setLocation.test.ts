import { Place, VirtualLocation } from 'src/types';
import { setLocation } from '../setLocation';

const virtualLocation: VirtualLocation = {
  name: 'Virtual Location',
  sameAs: 'https://example.com',
  url: 'https://example.com',
};

const place: Place = {
  name: 'Place',
  address: 'Address String',
};

describe('setLocation', () => {
  test('should return undefined if location is undefined', () => {
    expect(setLocation(undefined)).toBeUndefined();
  });

  test('should accepts simple string and returns it', () => {
    expect(setLocation('LocationText')).toBe('LocationText');
  });

  test('returns VirtualLocation correctly', () => {
    expect(setLocation(virtualLocation)).toMatchObject({
      '@type': 'VirtualLocation',
      ...virtualLocation,
    });
  });

  test('returns Place correctly', () => {
    expect(setLocation(place)).toMatchObject({
      '@type': 'Place',
      ...place,
    });
  });
});
