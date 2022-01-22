import React from 'react';

import { JsonLd, JsonLdProps } from './jsonld';

export interface LogoJsonLdProps extends JsonLdProps {
  logo: string;
  url: string;
}

function LogoJsonLd({
  type = 'Organization',
  keyOverride,
  ...rest
}: LogoJsonLdProps) {
  return (
    <JsonLd type={type} keyOverride={keyOverride} {...rest} scriptKey="Logo" />
  );
}

export default LogoJsonLd;
