import React from 'react';
import { CarouselJsonLd } from '../../../';
import Links from '../../components/links';

const Course = () => (
  <>
    <h1>Carousel Course JSON-LD</h1>

    <CarouselJsonLd
      ofType="course"
      data={[
        {
          courseName: 'Course 1',
          description: 'Course 1 Description',
          providerName: 'Course Provider',
          url: 'http://example.com/course-1.html',
        },
        {
          courseName: 'Course 2',
          description: 'Course 2 Description',
          providerName: 'Course Provider',
          url: 'http://example.com/course-2.html',
        },
      ]}
    />

    <Links />
  </>
);

export default Course;
