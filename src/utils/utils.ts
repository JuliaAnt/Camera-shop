import { ProductCard } from '../types/product-card';
import { Review } from '../types/review';

export const getAverageRating = (reviews: Review[], id: number) => {
  const sum = reviews
    ?.filter((review) => review.cameraId === id)
    .map((review) => review.rating)
    .reduce((a, b) => a + b, 0);

  return Math.ceil(sum / reviews?.length);
};

export const getMaxMinPrice = (filteredProducts: ProductCard[]): { max: number; min: number } => {
  if (!filteredProducts?.length) {
    return {
      max: 0,
      min: 0,
    };
  }

  const initialPrice = filteredProducts[0].price;

  const priceRange = {
    max: initialPrice,
    min: initialPrice,
  };

  filteredProducts.forEach((product) => {
    const price = product.price;
    if (price > priceRange.max) {
      priceRange.max = price;
    }
    if (price < priceRange.min) {
      priceRange.min = price;
    }
  });

  return priceRange;
};
