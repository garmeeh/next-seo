export function setNutrition(calories?: number) {
  if (calories) {
    return {
      '@type': 'NutritionInformation',
      calories: `${calories} calories`,
    };
  }

  return undefined;
}
