import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../consts';
import { catalogData } from './catalog-data/catalog-data-slice';
import { reviewData } from './review-data/review-data-slice';

export const rootReducer = combineReducers({
  [NameSpace.ReviewData]: reviewData.reducer,
  // [NameSpace.Basket]: userProcess.reducer,
  [NameSpace.CatalogData]: catalogData.reducer,
});
