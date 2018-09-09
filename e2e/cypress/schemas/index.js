import { combineSchemas } from '@cypress/schema-tools';
import courseVersions from './course-schema';
import articleVersions from './article-schema';
import blogVersions from './blog-schema';
import productVersions from './product-schema';

const schemas = combineSchemas(courseVersions, articleVersions, blogVersions, productVersions);
export default schemas;
