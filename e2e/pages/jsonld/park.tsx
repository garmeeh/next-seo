import React from 'react';
import { ParkJsonLd } from '../../..';

function Park() {
  return (
    <>
      <h1>Park</h1>
      <ParkJsonLd
        id="https://www.example.com/park/minnewaska-state-park"
        name="Minnewaska State Park"
        url="https://www.example.com/park"
        telephone="+18452550752"
        images={['https://example.com/photos/1x1/photo.jpg']}
        address={{
          streetAddress: '5281 Route 44-55',
          addressLocality: 'Kerhonkson',
          addressRegion: 'NY',
          postalCode: '12446',
          addressCountry: 'US',
        }}
        description="Description about Minnewaska State Park"
        geo={{
          latitude: '41.735149',
          longitude: '-74.239037',
        }}
        openingHours={[
          {
            opens: '09:00',
            closes: '18:00',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ],
            validFrom: '2019-12-23',
            validThrough: '2020-04-02',
          },
        ]}
      />
    </>
  );
}

export default Park;
