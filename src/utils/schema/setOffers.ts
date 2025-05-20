import { Offers, ReturnPolicySeasonalOverrides } from 'src/types';

export function setOffers(offers?: Offers | Offers[]) {
  function mapReturnPolicySeasonalOverrides(
    override: ReturnPolicySeasonalOverrides[],
  ) {
    return {
      '@type': 'MerchantReturnPolicySeasonalOverride',
      ...override,
    };
  }

  function mapOffer({ seller, hasMerchantReturnPolicy, ...rest }: Offers) {
    return {
      ...rest,
      '@type': 'Offer',
      ...(seller && {
        seller: {
          '@type': 'Organization',
          name: seller.name,
        },
      }),
      ...(hasMerchantReturnPolicy && {
        hasMerchantReturnPolicy: {
          '@type': 'MerchantReturnPolicy',
          ...hasMerchantReturnPolicy,
          ...(hasMerchantReturnPolicy?.returnPolicySeasonalOverride && {
            returnPolicySeasonalOverride: mapReturnPolicySeasonalOverrides(
              hasMerchantReturnPolicy?.returnPolicySeasonalOverride,
            ),
          }),
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
