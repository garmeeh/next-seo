import React from 'react';

import { JsonLd, JsonLdProps } from './jsonld';

export interface HEREJsonLdProps extends JsonLdProps {}

function HEREJsonLd({ type = 'HERE', keyOverride, ...rest }: HEREJsonLdProps) {
  return (
    <JsonLd type={type} keyOverride={keyOverride} {...rest} scriptKey="HERE" />
  );
}

export default HEREJsonLd;
