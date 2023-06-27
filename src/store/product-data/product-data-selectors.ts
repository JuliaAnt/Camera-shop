import { NameSpace } from '../../consts';
import { ProductCard } from '../../types/product-card';
import { Review } from '../../types/review';
import { State } from '../../types/state';

export const getProductReviews = (state: State): Review[] => state[NameSpace.ProductData].productReviews;
export const getSelectedProduct = (state: State): ProductCard | null => state[NameSpace.ProductData].selectedProduct;
export const getSimilarProducts = (state: State): ProductCard[] => state[NameSpace.ProductData].similarProducts;
