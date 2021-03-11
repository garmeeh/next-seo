import React from 'react';
export interface Question {
  questionName: string;
  acceptedAnswerText: string;
}
export interface FAQPageJsonLdProps {
  mainEntity: Question[];
}
declare const FAQPageJsonLd: React.FC<FAQPageJsonLdProps>;
export default FAQPageJsonLd;
