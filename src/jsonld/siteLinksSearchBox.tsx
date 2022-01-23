import React from 'react';

import { JsonLd, JsonLdProps } from './jsonld';

export interface PotentialAction {
  target: string;
  queryInput: string;
}

export interface SiteLinksSearchBoxJsonLdProps extends JsonLdProps {
  url: string;
  potentialActions: PotentialAction[];
}

function SiteLinksSearchBoxJsonLd({
  type = 'WebSite',
  keyOverride,
  potentialActions,
  ...rest
}: SiteLinksSearchBoxJsonLdProps) {
  function setPotentialAction(action: PotentialAction) {
    if (action) {
      const { target, queryInput } = action;
      return {
        '@type': 'SearchAction',
        target: `${target}={${queryInput}}`,
        'query-input': `required name=${queryInput}`,
      };
    }
    return undefined;
  }

  const data = {
    ...rest,
    potentialAction: potentialActions.map(setPotentialAction),
  };

  return (
    <JsonLd
      type={type}
      keyOverride={keyOverride}
      {...data}
      scriptKey="jsonld-siteLinksSearchBox"
    />
  );
}

export default SiteLinksSearchBoxJsonLd;
