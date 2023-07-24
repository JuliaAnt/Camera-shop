import { NameSpace } from '../../consts';
import { State } from '../../types/state';

export const getAddedProducts = (state: State): Record<number, number> => state[NameSpace.BasketData].productsInBasket;
