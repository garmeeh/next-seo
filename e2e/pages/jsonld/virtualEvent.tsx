import React from 'react';
import { EventJsonLd } from '../../..';

function VirtualEvent() {
  return (
    <>
      <h1>VirtualEvent</h1>
      <EventJsonLd
        name="Virtual Event"
        startDate="2020-01-23T00:00:00.000Z"
        endDate="2020-01-24T00:00:00.000Z"
        location={{
          name: 'A Livestream Platform',
          sameAs: 'https://example.com/another-virtual-event',
          url: 'https://example.com/virtual-event/watch',
        }}
        url="https://example.com/virtual-event"
        images={['https://example.com/photos/photo.jpg']}
        description="Virtual event @ A Livestream Platform"
        performers={[
          {
            name: 'Adele',
          },
          {
            name: 'Kira and Morrison',
          },
        ]}
        organizer={{
          type: 'Organization',
          name: 'Unnamed organization',
          url: 'https://www.unnamed.com',
        }}
        eventStatus="EventScheduled"
        eventAttendanceMode="OnlineEventAttendanceMode"
      />
    </>
  );
}

export default VirtualEvent;
