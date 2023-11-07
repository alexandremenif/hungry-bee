export type Rating = 1 | 2 | 3 | 4 | 5;

export function averageRatings(ratings: Rating[]): Rating {
  return Math.round(ratings.reduce((a, b) => a + b, 0) / ratings.length) as Rating;
}
