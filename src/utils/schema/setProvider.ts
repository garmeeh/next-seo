import type { Provider } from 'src/types';

export function setProvider(provider: Provider) {
  if (provider) {
    return {
      '@type': provider.type || 'Organization',
      name: provider.name,
      sameAs: provider.url,
    };
  }

  return undefined;
}
