import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../consts';
import { catalogData } from './catalog-data/catalog-data-slice';
import { productData } from './product-data/product-data-slice';

export const rootReducer = combineReducers({
  [NameSpace.ProductData]: productData.reducer,
  [NameSpace.CatalogData]: catalogData.reducer,
});
