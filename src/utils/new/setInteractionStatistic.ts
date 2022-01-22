export function setInteractionStatistic(watchCount?: number) {
  if (watchCount) {
    return {
      '@type': 'InteractionCounter',
      interactionType: 'http://schema.org/WatchAction',
      userInteractionCount: watchCount,
    };
  }
  return undefined;
}
