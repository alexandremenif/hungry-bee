import { z } from 'zod';
import { ratingSchema } from '../schemas/rating.schema';

export type Rating = z.infer<typeof ratingSchema>;

export function averageRatings(ratings: Rating[]): Rating {
  return Math.round(ratings.reduce((a, b) => a + b, 0) / ratings.length) as Rating;
}
