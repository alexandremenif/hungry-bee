export type Plan = {
  name: string;
  meals: Record<string, PlannedMeal>;
};

export type PlannedMeal = string;
