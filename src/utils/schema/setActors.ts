import { Actor } from 'src/types';

export function setActors(actors?: Actor | Actor[]) {
  function mapOffer({ actor, characterName }: Actor) {
    return {
      '@type': 'PerformanceRole',
      ...(actors && {
        actor: {
          '@type': 'Person',
          name: actor,
        },
        ...(characterName && { characterName: characterName }),
      }),
    };
  }

  if (Array.isArray(actors)) {
    return actors.map(mapOffer);
  } else if (actors) {
    return mapOffer(actors);
  }

  return undefined;
}
