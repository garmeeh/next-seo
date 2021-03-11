import { FC } from 'react';
export interface DatasetJsonLdProps {
  description: string;
  name: string;
  license?: string;
}
declare const DatasetJsonLd: FC<DatasetJsonLdProps>;
export default DatasetJsonLd;
