import { NextSeo, NextSeoProps } from '../../../';

export default async function Head() {
  const updateMeta: NextSeoProps = {
    title: 'No Index Example Page',
    description: 'This is an example without config.',
    noindex: true,
  };
  return <NextSeo {...updateMeta} useAppDir={true} />;
}
