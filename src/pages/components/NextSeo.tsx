import React from "react";
import type { NextSeoProps } from "../types";
import { WithHead } from "./WithHead";

/**
 * NextSeo component for managing SEO in Next.js Pages Router
 *
 * @example
 * ```tsx
 * import { NextSeo } from 'next-seo/pages';
 *
 * export default function Page() {
 *   return (
 *     <>
 *       <NextSeo
 *         title="Page Title"
 *         description="Page description"
 *         canonical="https://example.com/page"
 *         openGraph={{
 *           url: 'https://example.com/page',
 *           title: 'Open Graph Title',
 *           description: 'Open Graph Description',
 *           images: [
 *             {
 *               url: 'https://example.com/og-image.jpg',
 *               width: 800,
 *               height: 600,
 *               alt: 'Og Image Alt',
 *             }
 *           ],
 *         }}
 *       />
 *       <h1>Page Content</h1>
 *     </>
 *   );
 * }
 * ```
 */
export const NextSeo: React.FC<NextSeoProps> = (props) => {
  return <WithHead {...props} />;
};
