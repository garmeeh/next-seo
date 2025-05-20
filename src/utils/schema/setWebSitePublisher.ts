import { WebSitePublisher } from '../../types';

export function setWebSitePublisher(publisher?: WebSitePublisher) {
  if (publisher) {
    return {
      '@id': publisher.id,
    };
  }

  return undefined;
}
