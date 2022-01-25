import { Offers } from 'src/types';

export function setOffers(offers?: Offers | Offers[]) {
  function mapOffer({ seller, ...rest }: Offers) {
    return {
      ...rest,
      '@type': 'Offer',
      ...(seller && {
        seller: {
          '@type': 'Organization',
          name: seller.name,
        },
      }),
    };
  }

  if (Array.isArray(offers)) {
    return offers.map(mapOffer);
  } else if (offers) {
    return mapOffer(offers);
  }

  return undefined;
}
