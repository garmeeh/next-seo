import React from 'react';

import type { Provider } from '../types';
import { setProvider } from '../utils/schema/setProvider';

import { JsonLd, JsonLdProps } from './jsonld';

export interface CourseJsonLdProps extends JsonLdProps {
  courseName: string;
  description: string;
  provider: Provider;
}

function CourseJsonLd({
  type = 'Course',
  keyOverride,
  courseName,
  provider,
  ...rest
}: CourseJsonLdProps) {
  const data = {
    name: courseName,
    ...rest,
    provider: setProvider(provider),
  };
  return (
    <JsonLd
      type={type}
      keyOverride={keyOverride}
      {...data}
      scriptKey="course"
    />
  );
}

export default CourseJsonLd;
