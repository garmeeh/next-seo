import React from 'react';
import { CourseJsonLd } from '../../..';

function Course() {
  return (
    <>
      <h1>Article</h1>
      <CourseJsonLd
        courseName="Course Name"
        description="Introductory CS course laying out the basics."
        provider={{
          name: 'Course Provider',
          url: 'https//www.example.com/provider',
        }}
      />
    </>
  );
}

export default Course;
