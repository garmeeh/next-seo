import { AggregateOffer, Offers } from 'src/types';
import { setAggregateOffer } from '../setAggregateOffer';

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

describe('setAggregateOffer', () => {
  test('should return undefined if action is undefined', () => {
    expect(setAggregateOffer(undefined)).toBeUndefined();
  });

  test('works correctly with all params', () => {
    const aggregate: AggregateOffer = {
      priceCurrency: 'USD',
      highPrice: '100',
      lowPrice: '50',
      offerCount: '2',
      offers: offerOne,
    };

    const data = setAggregateOffer(aggregate);

    expect(data).toEqual({
      ...aggregate,
      '@type': 'AggregateOffer',
      offers: {
        '@type': 'Offer',
        ...offerOne,
        seller: { '@type': 'Organization', ...offerOne.seller },
      },
    });
  });

  test('works correctly with only required props', () => {
    const aggregate: AggregateOffer = {
      priceCurrency: 'USD',
      lowPrice: '50',
    };

    const data = setAggregateOffer(aggregate);

    expect(data).toEqual({
      ...aggregate,
      '@type': 'AggregateOffer',
    });
  });
});
