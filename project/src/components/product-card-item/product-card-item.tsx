import { ProductCard } from '../../types/product-card';
import { RATINGS } from '../../consts';
import RatingItem from '../rating-item/rating-item';
import { useState } from 'react';
import PopupCatalogAddItem from '../popup/popup-catalog-add-item/popup-catalog-add-item';
import { Link } from 'react-router-dom';

type ProductCardItemProps = {
  productCard: ProductCard;
  className: string;
}

function ProductCardItem({ productCard, className }: ProductCardItemProps): JSX.Element {
  const { id, name, price, reviewCount, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x } = productCard;
  const [isModalOpen, setModalOpen] = useState(false);
  const rating = 2;

  return (
    <div key={id} className={`product-card ${className}`}>
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
        <p className="product-card__title" data-testid={`cardTitle-${id}`}>{name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>
          {`${price} ₽`}
        </p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button" onClick={() => setModalOpen(true)}>Купить
        </button>
        <Link className="btn btn--transparent" to={`/camera/${id}?specs`}>Подробнее
        </Link>
      </div>
      <PopupCatalogAddItem isModalOpen={isModalOpen} productCard={productCard} onModalClose={() => setModalOpen(false)} />
    </div>
  );
}

export default ProductCardItem;
