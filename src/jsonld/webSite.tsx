import React from 'react';

import { JsonLd, JsonLdProps } from './jsonld';
import { WebSitePublisher } from '../types';
import { setWebSitePublisher } from '../utils/schema/setWebSitePublisher';

export interface WebSiteJsonLdProps extends JsonLdProps {
  name: string;
  url?: string;
  alternateName?: string | string[];
  publisher?: WebSitePublisher;
}

function WebSiteJsonLd({
  type = 'WebSite',
  keyOverride,
  publisher,
  ...rest
}: WebSiteJsonLdProps) {
  const data = {
    ...rest,
    publisher: setWebSitePublisher(publisher),
  };

  return (
    <JsonLd
      type={type}
      keyOverride={keyOverride}
      {...data}
      scriptKey="WebSite"
    />
  );
}

export default WebSiteJsonLd;
