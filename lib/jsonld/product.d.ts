/// <reference types="react" />
declare const ProductJsonLd: {
  (
    {
      productName,
      images,
      description,
      sku,
      gtin8,
      gtin13,
      gtin14,
      mpn,
      brand,
      reviews,
      aggregateRating,
      offers,
    }: {
      productName: any;
      images?: any[];
      description: any;
      sku: any;
      gtin8: any;
      gtin13: any;
      gtin14: any;
      mpn: any;
      brand: any;
      reviews?: any[];
      aggregateRating: any;
      offers: any;
    },
  ): JSX.Element;
  defaultProps: {
    images: any[];
    description: any;
    brand: any;
    reviews: any[];
    aggregateRating: any;
    offers: any;
    sku: any;
    gtin8: any;
    gtin13: any;
    gtin14: any;
    mpn: any;
  };
};
export default ProductJsonLd;
