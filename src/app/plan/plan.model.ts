import { Index } from '../shared/price';
import { Rating } from '../shared/rating';

export type Plan = {
  name: string,
  meals: Meal[]
};

export type Meal = {
  name: string,
  description: string,
  price: Index,
  rating: Rating
};

