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
  images?: ImageJsonLd[];
}

function ImageJsonLd({
  keyOverride,
  contentUrl,
  license,
  acquireLicensePage,
  creditText,
  creator,
  copyrightNotice,
  images,
}: ImageJsonLdProps) {
  if (images) {
    return (
      <JsonLd
        type="ImageObject"
        keyOverride={keyOverride}
        dataArray={images}
        scriptKey="image"
      />
    );
  }

  const data = {
    license,
    acquireLicensePage,
    creditText,
    creator,
    copyrightNotice,
    contentUrl,
  };

  return (
    <JsonLd
      type="ImageObject"
      keyOverride={keyOverride}
      {...data}
      scriptKey="image"
    />
  );
}

export default ImageJsonLd;
