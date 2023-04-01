import { NextSeo, NextSeoProps } from '../../../';
import { NEXT_SEO_DEFAULT } from '../../next-seo.config';

export default async function Head() {
  const updateMeta: NextSeoProps = {
    ...NEXT_SEO_DEFAULT,
    title: 'Example Page',
    description: 'This is an example page',
    titleTemplate: '%s',
  };
  return <NextSeo {...updateMeta} useAppDir={true} />;
}
