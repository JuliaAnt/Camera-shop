import { NameSpace } from '../../consts';
import { Coupon } from '../../types/coupon';
import { ProductCard } from '../../types/product-card';
import { State } from '../../types/state';

export const getAddedProducts = (state: State): Record<number, number> => state[NameSpace.BasketData].productsInBasket;
export const getDiscont = (state: State): number | undefined => state[NameSpace.BasketData].discont;
export const getCoupon = (state: State): Coupon => state[NameSpace.BasketData].submittedCoupon;
export const getOrderStatus = (state: State): boolean => state[NameSpace.BasketData].hasOrderError;

export const getBasketState = (state: State): { productsInBasket: Record<number, number>; discont: number | undefined; submittedCoupon: Coupon; hasOrderError: boolean; productCards: ProductCard[] } => ({ productsInBasket: state[NameSpace.BasketData].productsInBasket, discont: state[NameSpace.BasketData].discont, submittedCoupon: state[NameSpace.BasketData].submittedCoupon, hasOrderError: state[NameSpace.BasketData].hasOrderError, productCards: state[NameSpace.CatalogData].productCards });
