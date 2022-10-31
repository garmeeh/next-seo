import { NextSeo, NextSeoProps } from '../../../';

export default async function Head() {
  const meta: NextSeoProps = {
    title: 'No Index Example Page',
    description: 'This is an example without config.',
    noindex: true,
  };

  return <NextSeo {...meta} useAppDir={true} />;
}
