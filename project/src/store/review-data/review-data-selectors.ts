import { NameSpace } from '../../consts';
import { Review } from '../../types/review';
import { State } from '../../types/state';

export const getProductReviews = (state: State): Review[] => state[NameSpace.ReviewData].productReviews;
