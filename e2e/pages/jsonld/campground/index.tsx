import React from 'react';
import { CampgroundJsonLd } from '../../../..';

function Campground() {
  return (
    <>
      <h1>Campground</h1>
      <CampgroundJsonLd
        id="https://www.example.com/campground/rip-van-winkle-campground"
        name="Rip Van Winkle Campgrounds"
        url="https://www.example.com/campground"
        telephone="+18452468114"
        images={['https://example.com/photos/1x1/photo.jpg']}
        address={{
          streetAddress: '149 Blue Mountain Rd',
          addressLocality: 'Saugerties',
          addressRegion: 'NY',
          postalCode: '12477',
          addressCountry: 'US',
        }}
        description="Description about Rip Van Winkle Campgrounds"
        geo={{
          latitude: '42.092599',
          longitude: '-74.018580',
        }}
        openingHours={[
          {
            opens: '09:00',
            closes: '17:00',
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
        petsAllowed
        rating={{
          ratingValue: '5',
          ratingCount: '18',
        }}
        amenityFeature={{
          name: 'Showers',
          value: true,
        }}
        priceRange="$$"
      />
    </>
  );
}

export default Campground;
