export function setSupply(supply?: string[]) {
  if (supply) {
    return supply.map(supplyItem => ({
      '@type': 'HowToSupply',
      name: supplyItem,
    }));
  }

  return undefined;
}
