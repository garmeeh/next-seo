import { combineSchemas } from '@cypress/schema-tools';
import courseVersions from './course-schema';
import articleVersions from './article-schema';
import blogVersions from './blog-schema';
import productVersions from './product-schema';
import socialProfileVersions from './social-profile-schema';

const schemas = combineSchemas(
  courseVersions,
  articleVersions,
  blogVersions,
  productVersions,
  socialProfileVersions,
);
export default schemas;
