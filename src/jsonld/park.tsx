import React from 'react';
import { JsonLd, JsonLdProps } from './jsonld';
import { Address, Geo, OpeningHoursSpecification } from 'src/types';
import { setGeo } from 'src/utils/schema/setGeo';
import { setAddress } from 'src/utils/schema/setAddress';
import { setOpeningHours } from 'src/utils/schema/setOpeningHours';

export interface ParkJsonLdProps extends JsonLdProps {
  address: Address | Address[];
  description: string;
  geo?: Geo;
  images?: string[];
  isAccessibleForFree?: boolean;
  name: string;
  openingHours?: OpeningHoursSpecification | OpeningHoursSpecification[];
  telephone?: string;
  type?: string;
  url?: string;
}

function ParkJsonLd({
  address,
  geo,
  images,
  keyOverride,
  openingHours,
  type = 'Park',
  ...rest
}: ParkJsonLdProps) {
  const data = {
    image: images,
    openingHoursSpecification: Array.isArray(openingHours)
      ? openingHours.map(setOpeningHours)
      : setOpeningHours(openingHours),
    address: setAddress(address),
    geo: setGeo(geo),
    ...rest,
  };
  return (
    <JsonLd type={type} keyOverride={keyOverride} {...data} scriptKey="park" />
  );
}

export default ParkJsonLd;
