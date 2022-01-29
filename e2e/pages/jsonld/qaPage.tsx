import React from 'react';
import { QAPageJsonLd } from '../../..';

function QaPage() {
  return (
    <>
      <h1>QA Page</h1>
      <QAPageJsonLd
        mainEntity={{
          name: 'How many ounces are there in a pound?',
          text: 'I have taken up a new interest in baking and keep running across directions in ounces and pounds. I have to translate between them and was wondering how many ounces are in a pound?',
          answerCount: 3,
          upvoteCount: 26,
          dateCreated: '2016-07-23T21:11Z',
          author: { name: 'New Baking User' },
          acceptedAnswer: {
            text: '1 pound (lb) is equal to 16 ounces (oz).',
            dateCreated: '2016-11-02T21:11Z',
            upvoteCount: 1337,
            url: 'https://example.com/question1#acceptedAnswer',
            author: {
              name: 'SomeUser',
            },
          },
          suggestedAnswer: [
            {
              text: 'Are you looking for ounces or fluid ounces? If you are looking for fluid ounces there are 15.34 fluid ounces in a pound of water.',
              dateCreated: '2016-11-02T21:11Z',
              upvoteCount: 42,
              url: 'https://example.com/question1#suggestedAnswer1',
              author: {
                name: 'AnotherUser',
              },
            },
            {
              text: `I can't remember exactly, but I think 18 ounces in a lb. You might want to double check that.`,
              dateCreated: '2016-11-06T21:11Z',
              upvoteCount: 0,
              url: 'https://example.com/question1#suggestedAnswer2',
              author: {
                name: 'ConfusedUser',
              },
            },
          ],
        }}
      />
    </>
  );
}

export default QaPage;
