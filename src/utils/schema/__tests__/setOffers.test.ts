import { Offers } from 'src/types';
import { setOffers } from '../setOffers';

const offerOne: Offers = {
  price: '100',
  priceCurrency: 'USD',
  availability: 'InStock',
  itemCondition: 'NewCondition',
  validFrom: '2020-01-02',
  url: 'https://example.com',
  seller: {
    name: 'Seller',
  },
};

const offerTwo: Offers = {
  price: '900',
  priceCurrency: 'CAD',
  itemCondition: 'PreOwned',
  availability: 'OutOfStock',
  validFrom: '2020-01-01',
  url: 'https://who.com',
  seller: {
    name: 'SellerTwo',
  },
};

describe('setOffers', () => {
  test('should return undefined if offers is undefined', () => {
    expect(setOffers(undefined)).toBeUndefined();
  });

  test('handles empty array', () => {
    expect(setOffers([])).toStrictEqual([]);
  });

  test('handles single offer', () => {
    const data = setOffers(offerOne);

    expect(data).toEqual({
      ...offerOne,
      '@type': 'Offer',
      seller: { '@type': 'Organization', ...offerOne.seller },
    });
  });

  test('handles multiple offers', () => {
    const data = setOffers([offerOne, offerTwo]);

    expect(data).toEqual([
      {
        ...offerOne,
        '@type': 'Offer',
        seller: { '@type': 'Organization', ...offerOne.seller },
      },
      {
        ...offerTwo,
        '@type': 'Offer',
        seller: { '@type': 'Organization', ...offerTwo.seller },
      },
    ]);
  });

  test('handles when optional props omitted', () => {
    const offer: Offers = {
      price: '50',
      priceCurrency: 'CAD',
      seller: {
        name: 'SellerTwo',
      },
    };

    const data = setOffers(offer);
    expect(data).toEqual({
      ...offer,
      '@type': 'Offer',
      seller: { '@type': 'Organization', ...offer.seller },
    });
  });
});
