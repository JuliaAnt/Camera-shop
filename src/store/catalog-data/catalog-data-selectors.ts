import { NameSpace } from '../../consts';
import { SelectedFilter } from '../../types/filters';
import { ProductCard } from '../../types/product-card';
import { PromoProduct } from '../../types/promo';
import { SortsType } from '../../types/sorts';
import { State } from '../../types/state';

export const getProducts = (state: State): ProductCard[] => state[NameSpace.CatalogData].productCards;
export const getFilteredProducts = (state: State): ProductCard[] => state[NameSpace.CatalogData].filteredCards;
export const getSelectedFilters = (state: State): SelectedFilter[] => state[NameSpace.CatalogData].selectedFilters;
export const getSorts = (state: State): SortsType => state[NameSpace.CatalogData].sorts;
export const getPromoProduct = (state: State): PromoProduct | null => state[NameSpace.CatalogData].promoProduct;
export const getErrorStatus = (state: State): boolean => state[NameSpace.CatalogData].hasError;

