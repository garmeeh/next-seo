import { Address } from 'src/types';
import { setAddress } from '../setAddress';

const addressOne: Address = {
  addressLocality: 'Locality',
  addressRegion: 'Region',
  postalCode: 'PostalCode',
  streetAddress: 'StreetAddress',
  addressCountry: 'Country',
};

const addressTwo: Address = {
  addressLocality: 'LocalityTwo',
  addressRegion: 'RegionTwo',
  postalCode: 'PostalCodeTwo',
  streetAddress: 'StreetAddressTwo',
  addressCountry: 'CountryTwo',
};

describe('setAddress', () => {
  test('should return undefined if address is undefined', () => {
    expect(setAddress(undefined)).toBeUndefined();
  });

  test('single address returns correctly', () => {
    const data = setAddress(addressOne);

    expect(data).toEqual({
      '@type': 'PostalAddress',
      ...addressOne,
    });
  });

  test('array of addresses returns correctly', () => {
    const data = setAddress([addressOne, addressTwo]);

    expect(data).toEqual([
      {
        '@type': 'PostalAddress',
        ...addressOne,
      },
      {
        '@type': 'PostalAddress',
        ...addressTwo,
      },
    ]);
  });

  test('single item array of addresses returns correctly', () => {
    const data = setAddress([addressOne]);

    expect(data).toEqual({
      '@type': 'PostalAddress',
      ...addressOne,
    });
  });

  test('handles without required props', () => {
    const { addressRegion, ...address } = addressOne;
    const data = setAddress(address);

    expect(data).toEqual({
      '@type': 'PostalAddress',
      ...address,
    });
  });
});
