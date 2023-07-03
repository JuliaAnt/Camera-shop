import { ProductCard } from '../../types/product-card';
import { RATINGS } from '../../consts';
import RatingItem from '../rating-item/rating-item';
import { useState } from 'react';
import PopupCatalogAddItem from '../popup/popup-catalog-add-item/popup-catalog-add-item';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import FocusTrap from 'react-focus-trap';

type ProductCardItemProps = {
  productCard: ProductCard;
  className: string;
}

function ProductCardItem({ productCard, className }: ProductCardItemProps): JSX.Element {
  const { id, name, price, reviewCount, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x } = productCard;
  const [isModalOpen, setModalOpen] = useState(false);
  const rating = 2;

  useEffect(() => {
    const onModalEscKeydown = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        onModalClose();
      }
    };

    window.addEventListener('keydown', onModalEscKeydown);
    return () => window.removeEventListener('keydown', onModalEscKeydown);

  }, []);

  const onModalOpen = () => {
    setModalOpen(true);
    document.body.style.position = 'fixed';
  };

  const onModalClose = () => {
    setModalOpen(false);
    document.body.style.position = '';
  };

  return (
    <div key={id} className={`product-card ${className}`} data-testid={'product-card-item'}>
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
        <p className="product-card__price" data-testid={'cardPrice'}>
          <span className="visually-hidden">Цена:</span>
          {`${price} ₽`}
        </p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button" onClick={onModalOpen}>Купить
        </button>
        <Link className="btn btn--transparent" to={`/camera/${id}?tab=description`}>Подробнее
        </Link>
      </div>
      {/* @ts-expect-error children*/}
      <FocusTrap active={isModalOpen} focusTrapOptions={{ initialFocus: '#add-btn', onDeactivate: onModalClose }}>
        <PopupCatalogAddItem isModalOpen={isModalOpen} productCard={productCard} onModalClose={onModalClose} />
      </FocusTrap>
    </div>
  );
}

export default ProductCardItem;
