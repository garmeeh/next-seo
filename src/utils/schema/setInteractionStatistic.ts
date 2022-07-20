export function setInteractionStatistic(watchCount?: number) {
  if (watchCount) {
    return {
      '@type': 'InteractionCounter',
      interactionType: 'https://schema.org/WatchAction',
      userInteractionCount: watchCount,
    };
  }
  return undefined;
}
