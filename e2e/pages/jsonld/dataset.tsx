import React from 'react';
import { DatasetJsonLd } from '../../..';

function Dataset() {
  return (
    <>
      <h1>Dataset</h1>
      <DatasetJsonLd
        description="The description needs to be at least 50 characters long"
        name="name of the dataset"
        license="https//www.example.com"
      />
    </>
  );
}

export default Dataset;
