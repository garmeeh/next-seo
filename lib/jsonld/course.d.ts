import { FC } from 'react';
export interface CourseJsonLdProps {
  keyOverride?: string;
  courseName: string;
  description: string;
  providerName: string;
  providerUrl?: string;
}
declare const CourseJsonLd: FC<CourseJsonLdProps>;
export default CourseJsonLd;
