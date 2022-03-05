import React from 'react';
import type { ReviewedBy } from 'src/types';

import { JsonLd } from './jsonld';
import { setReviewedBy } from 'src/utils/schema/setReviewedBy';

export interface WebPageJsonLdProps {
  keyOverride?: string;
  id: string;
  description?: string;
  lastReviewed?: string;
  reviewedBy?: ReviewedBy;
}

function WebPageJsonLd({
  keyOverride,
  reviewedBy,
  ...rest
}: WebPageJsonLdProps) {
  const data = {
    ...rest,
    reviewedBy: setReviewedBy(reviewedBy),
  };
  return (
    <JsonLd
      keyOverride={keyOverride}
      {...data}
      type="WebPage"
      scriptKey="WebPage"
    />
  );
}

export default WebPageJsonLd;
