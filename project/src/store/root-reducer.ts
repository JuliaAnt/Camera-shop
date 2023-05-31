import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../consts';
import { catalogData } from './catalog-data/catalog-data-slice';

export const rootReducer = combineReducers({
  // [NameSpace.QuestsData]: questsData.reducer,
  // [NameSpace.Basket]: userProcess.reducer,
  [NameSpace.CatalogData]: catalogData.reducer,
});
