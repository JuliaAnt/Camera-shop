import { NameSpace } from '../../consts';
import { ProductCard } from '../../types/product-card';
import { State } from '../../types/state';

export const getProducts = (state: State): ProductCard[] => state[NameSpace.CatalogData].productCards;
