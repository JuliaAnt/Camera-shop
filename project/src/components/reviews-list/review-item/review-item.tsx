import { RATINGS } from '../../../consts';
import { Review } from '../../../types/review';
import RatingItem from '../../rating-item/rating-item';

type ReviewItemProps = {
  reviewData: Review;
}

type DateOptions = {
  day: 'numeric' | '2-digit' | undefined;
  month: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long' | undefined;
}

function ReviewItem({ reviewData }: ReviewItemProps): JSX.Element {
  const { id, createAt, cameraId, userName, advantage, disadvantage, review, rating } = reviewData;
  const dateOptions: DateOptions = { day: 'numeric', month: 'long' };
  const formattedDate = new Intl.DateTimeFormat('ru-RU', dateOptions).format(new Date(createAt));

  return (
    <li key={`${id}-${cameraId}`} className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{userName}</p>
        <time className="review-card__data" dateTime={createAt}>{formattedDate}</time>
      </div>
      <div className="rate review-card__rate">
        {RATINGS.map((reviewRating) => <RatingItem key={reviewRating} id={reviewRating} rating={rating} />)}
        <p className="visually-hidden">{`Оценка: ${rating}`}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list"><span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{advantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{disadvantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{review}</p>
        </li>
      </ul>
    </li>
  );
}

export default ReviewItem;
