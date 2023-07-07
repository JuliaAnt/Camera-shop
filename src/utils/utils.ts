import { Review } from '../types/review';

export const getAverageRating = (reviews: Review[], id: number) => {
  const sum = reviews
    ?.filter((review) => review.cameraId === id)
    .map((review) => review.rating)
    .reduce((a, b) => a + b, 0);

  return Math.ceil(sum / reviews?.length);
};
