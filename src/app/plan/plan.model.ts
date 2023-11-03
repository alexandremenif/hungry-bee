import { Price, Rating } from '../shared/shared.model';

export type Plan = {
  name: string,
  meals: Meal[]
};

export type Meal = {
  key: string,
  name: string,
  description: string,
  price: Price,
  rating: Rating
};

export type RawPlan = {
  name: string,
  meals: { key: string, code: string }[]
};

export type RawMeal = {
  name: string,
  description: string,
  price: Price,
  ratings: { [personCode: string]: Rating }
};

export function averageRatings(ratings: Rating[]): Rating {
  return Math.round(ratings.reduce((a, b) => a + b, 0) / ratings.length) as Rating;
}

export function createPlan(rawPlan: RawPlan, rawMeals: { [mealKey: string]: RawMeal }, personCodes: string[]): Plan {
  return {
    name: rawPlan.name,
    meals: rawPlan.meals.map(({ key, code }) => {
      const rawMeal = rawMeals[code];
      const ratings = personCodes.map(personKey => rawMeal.ratings[personKey] ?? 3);
      return {
        key,
        name: rawMeal.name,
        description: rawMeal.description,
        price: rawMeal.price,
        rating: averageRatings(ratings)
      }
    })
  };
}
