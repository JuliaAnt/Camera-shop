import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/redux-hooks';
import { getProductReviews } from '../../store/product-data/product-data-selectors';
import ReviewItem from './review-item/review-item';
import { REVIEWS_PER_PAGE } from '../../consts';

function ReviewsList(): JSX.Element {
  const reviewsList = useAppSelector(getProductReviews);
  const [reviewsCount, setReviewsCount] = useState(REVIEWS_PER_PAGE);

  const onButtonClick = () => {
    setReviewsCount((count) => count + REVIEWS_PER_PAGE);
  };

  useEffect(() => {
    document.addEventListener('scroll', onScrollPage);
  }, []);

  const onScrollPage = () => {
    const height = document.body.offsetHeight;
    const screenHeight = window.innerHeight;
    const scrolled = window.scrollY;
    const position = scrolled + screenHeight;
    if (position >= height) {
      setTimeout(() => {
        setReviewsCount((count) => count + REVIEWS_PER_PAGE);
      }, 500);
    }
  };

  const sortedReviews = [...reviewsList];
  sortedReviews.sort((reviewA, reviewB) => {
    if (reviewA.createAt !== reviewB.createAt) {
      return Date.parse(reviewB.createAt) - Date.parse(reviewA.createAt);
    }
    return 1;
  });

  return (
    <div className="container" onScroll={onScrollPage}>
      <div className="page-content__headed">
        <h2 className="title title--h3">Отзывы</h2>
        <button className="btn" type="button">Оставить свой отзыв</button>
      </div>
      <ul className="review-block__list">
        {sortedReviews.slice(0, reviewsCount).map((review) => <ReviewItem key={`${review.id}-${review.cameraId}`} reviewData={review} />)}
      </ul>
      <div className="review-block__buttons">
        <button className="btn btn--purple" type="button" style={{ visibility: `${reviewsCount >= reviewsList.length ? 'hidden' : 'visible'}` }} onClick={onButtonClick}>Показать больше отзывов
        </button>
      </div>
    </div>
  );
}

export default ReviewsList;
