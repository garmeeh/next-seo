import React from 'react';
import { VideoGameJsonLd } from '../../..';

function VideoGame() {
  return (
    <>
      <h1>Video Game</h1>
      <VideoGameJsonLd
        name="Red Dead Redemption 2"
        translatorName={['Translator 1', 'Translator 2']}
        languageName={['English', 'Kurdish']}
        description="Arthur Morgan and the Van der Linde gang are outlaws on the run. With federal agents and the best bounty hunters in the nation massing on their heels, the gang must rob, steal and fight their way across the rugged heartland of America in order to survive."
        processorRequirements="4 GHz"
        memoryRequirements="16 Gb"
        playMode="SinglePlayer"
        applicationCategory="Game"
        url="https://example.com/rdr2-game"
        platformName={['PC game', 'PlayStation 4']}
        operatingSystemName="windows"
        keywords="outlaw, gang, federal agents"
        datePublished="2019-02-05T08:00:00+08:00"
        image="https://example.com/photos/1x1/photo.jpg"
        publisherName="Vertical Games"
        producerName="Rockstar Games"
        producerUrl="https//www.example.com/producer"
        offers={[
          {
            price: '119.99',
            priceCurrency: 'USD',
            priceValidUntil: '2020-11-05',
            availability: 'https://schema.org/InStock',
            url: 'https://example.net/rdr2-game',
            seller: {
              name: 'Executive Gaming',
            },
          },
          {
            price: '139.99',
            priceCurrency: 'CAD',
            priceValidUntil: '2020-09-05',
            availability: 'https://schema.org/InStock',
            url: 'https://example.org/rdr2-game',
            seller: {
              name: 'Executive Gaming',
            },
          },
        ]}
        aggregateRating={{
          ratingValue: '44',
          reviewCount: '89',
          ratingCount: '684',
          bestRating: '100',
        }}
        reviews={[
          {
            author: 'AhmetKaya',
            publisher: {
              type: 'Organization',
              name: 'Gam Production',
            },
            datePublished: '2017-01-06T03:37:40Z',
            reviewBody: 'Iki gozum.',
            name: 'Rica ederim.',
            reviewRating: {
              bestRating: '5',
              ratingValue: '5',
              worstRating: '1',
            },
          },
        ]}
      />
    </>
  );
}

export default VideoGame;
