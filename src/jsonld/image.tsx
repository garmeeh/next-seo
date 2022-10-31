import React from 'react';

import { JsonLd, JsonLdProps } from './jsonld';

type Creator = {
  '@type': 'Person' | 'Organisation';
  name: string;
};

interface ImageJsonLd {
  contentUrl?: string;
  creator?: Creator;
  creditText?: string;
  copyrightNotice?: string;
  license?: string;
  acquireLicensePage?: string;
}

export interface ImageJsonLdProps extends JsonLdProps {
  images: ImageJsonLd[];
}

function ImageJsonLd({ keyOverride, images, ...rest }: ImageJsonLdProps) {
  return (
    <JsonLd
      type="ImageObject"
      keyOverride={keyOverride}
      dataArray={images}
      {...rest}
      scriptKey="image"
    />
  );
}

export default ImageJsonLd;
