import type { Offer } from 'src/types';

export function setOffer(offer?: Offer) {
  function setPriceSpecification(
    priceSpecification: Offer['priceSpecification'],
  ) {
    if (priceSpecification) {
      return {
        '@type': priceSpecification.type,
        priceCurrency: priceSpecification.priceCurrency,
        price: priceSpecification.price,
      };
    }

    return undefined;
  }

  function setItemOffered(itemOffered: Offer['itemOffered']) {
    if (itemOffered) {
      return {
        ...itemOffered,
        '@type': 'Service',
      };
    }

    return undefined;
  }

  if (offer) {
    return {
      ...offer,
      '@type': 'Offer',
      priceSpecification: setPriceSpecification(offer.priceSpecification),
      itemOffered: setItemOffered(offer.itemOffered),
    };
  }

  return undefined;
}
