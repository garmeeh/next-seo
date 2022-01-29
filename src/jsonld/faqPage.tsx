import React from 'react';

import type { Question } from 'src/types';
import { JsonLd, JsonLdProps } from './jsonld';
import { setQuestions } from 'src/utils/schema/setQuestions';

export interface FAQPageJsonLdProps extends JsonLdProps {
  mainEntity: Question[];
}

function FAQPageJsonLd({
  type = 'FAQPage',
  keyOverride,
  mainEntity,
  ...rest
}: FAQPageJsonLdProps) {
  const data = {
    ...rest,
    mainEntity: setQuestions(mainEntity),
  };

  return (
    <JsonLd
      type={type}
      keyOverride={keyOverride}
      {...data}
      scriptKey="faq-page"
    />
  );
}

export default FAQPageJsonLd;
