import React from 'react';
import { FAQPageJsonLd } from '../../..';

function FAQPage() {
  return (
    <>
      <h1>FAQPage</h1>
      <FAQPageJsonLd
        mainEntity={[
          {
            questionName: 'How long is the delivery time?',
            acceptedAnswerText: '3-5 business days.',
          },
          {
            questionName: 'Where can I find information about product recalls?',
            acceptedAnswerText: 'Read more on under information.',
          },
        ]}
      />
    </>
  );
}

export default FAQPage;
