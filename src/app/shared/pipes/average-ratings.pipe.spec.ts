import { AverageMealRatingPipe } from './average-ratings.pipe';

describe('AverageMealRatingPipe', () => {
  it('create an instance', () => {
    const pipe = new AverageMealRatingPipe();
    expect(pipe).toBeTruthy();
  });
});
