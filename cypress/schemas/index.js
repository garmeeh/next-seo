import { combineSchemas } from '@cypress/schema-tools';

import articleVersions from './article-schema';
import breadCrumbVersions from './breadcrumb-schema';
import blogVersions from './blog-schema';
import courseVersions from './course-schema';
import localBusiness from './local-business-schema';
import logoVersions from './logo-schema';
import productVersions from './product-schema';
import socialProfileVersions from './social-profile-schema';
import corporateContactVersions from './corporate-contact-schema';
import newsarticleVersions from './newsarticle-schema';
import faqPageVersion from './faq-page-schema';
import jobPostingVersions from './job-posting-schema';
import eventVersion from './event-schema';
import datasetVersion from './dataset-schema';
import recipeVersion from './recipe-schema';
import siteLinksSearchBoxVersion from './site-links-search-box-schema';
import qaPageVersions from './qa-page-schema';
import softwareAppVersions from './software-app-schema';
import collectionPageVersions from './collection-page-schema';
import profilePageVersions from './profile-page-schema';
import videoGameVersions from './videogame-schema';
import organizationVersions from './organization-schema';
import brandVersions from './brand-schema';
import webPageVersions from './web-page-schema';
import videoVersions from './video-schema';
import howToVersions from './how-to-schema';
import imageVersions from './image-schema';
import parkVersions from './park-schema';

const schemas = combineSchemas(
  articleVersions,
  breadCrumbVersions,
  blogVersions,
  courseVersions,
  localBusiness,
  logoVersions,
  productVersions,
  socialProfileVersions,
  corporateContactVersions,
  newsarticleVersions,
  faqPageVersion,
  jobPostingVersions,
  eventVersion,
  datasetVersion,
  recipeVersion,
  siteLinksSearchBoxVersion,
  qaPageVersions,
  softwareAppVersions,
  collectionPageVersions,
  profilePageVersions,
  videoGameVersions,
  organizationVersions,
  brandVersions,
  webPageVersions,
  videoVersions,
  howToVersions,
  imageVersions,
  parkVersions,
);
export default schemas;
