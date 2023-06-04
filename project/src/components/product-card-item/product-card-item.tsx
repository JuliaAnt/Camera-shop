// import { useEffect } from 'react';
// import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
// import { fetchReviewsAction } from '../../store/api-actions';
import { ProductCard } from '../../types/product-card';
// import { getProductReviews } from '../../store/review-data/review-data-selectors';
import { RATINGS } from '../../consts';
import RatingItem from '../rating-item/rating-item';

type ProductCardItemProps = {
  productCard: ProductCard;
}

function ProductCardItem({ productCard }: ProductCardItemProps): JSX.Element {
  // const dispatch = useAppDispatch();
  const { id, name, price, reviewCount, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x } = productCard;

  // useEffect(() => {
  //   let isMounted = true;

  //   if (isMounted) {
  //     dispatch(fetchReviewsAction(id));
  //   }

  //   return () => {
  //     isMounted = false;
  //   };
  // }, [dispatch, id]);

  // const reviews = useAppSelector(getProductReviews);

  // // eslint-disable-next-line no-console
  // // console.log(id, reviews);

  // const ratings: number[] = [];
  // reviews.map((review) => {
  //   if (review.cameraId === id) {
  //     ratings.push(review.rating);
  //   }
  //   return ratings;
  // });

  // // eslint-disable-next-line no-console
  // console.log(id, ratings);

  // const sum: number = ratings.reduce((a, b) => a + b, 0);
  // const rating = Math.round(sum / ratings.length);
  const rating = 2;

  return (
    <div key={id} className="product-card">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`} />
          <img src={previewImg} srcSet={`${previewImg2x} 2x`} width="280" height="240" alt={name} />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {RATINGS.map((reviewRating) => <RatingItem key={reviewRating} id={reviewRating} rating={rating} />)}

          <p className="visually-hidden">{`Рейтинг: ${rating}`}</p>
          <p className="rate__count">
            <span className="visually-hidden">Всего оценок:</span>
            {reviewCount}
          </p>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>
          {`${price} ₽`}
        </p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button">Купить
        </button>
        <a className="btn btn--transparent" href="#">Подробнее
        </a>
      </div>
    </div>
  );
}

export default ProductCardItem;
