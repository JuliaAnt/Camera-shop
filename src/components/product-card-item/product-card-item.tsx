import { ProductCard } from '../../types/product-card';
import { AppRoute, RATINGS } from '../../consts';
import RatingItem from '../rating-item/rating-item';
import { useState } from 'react';
import PopupCatalogAddItem from '../popup/popup-catalog-add-item/popup-catalog-add-item';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import FocusTrap from 'react-focus-trap';
import { Review } from '../../types/review';
import { getAverageRating } from '../../utils/utils';
import PopupCatalogAddItemSuccess from '../popup/popup-catalog-add-item-success/popup-catalog-add-item-success';
import { getAddedProducts } from '../../store/basket-data/basket-data-selectors';
import { useAppSelector } from '../../hooks/redux-hooks';

type ProductCardItemProps = {
  productCard: ProductCard;
  className: string;
  reviews: Review[];
}

function ProductCardItem({ productCard, className, reviews }: ProductCardItemProps): JSX.Element {
  const addedProducts = useAppSelector(getAddedProducts);
  const { id, name, price, reviewCount, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x } = productCard;
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAddingProductSuccessModalOpen, setAddingProductSuccessModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const rating = getAverageRating(reviews, id);

  useEffect(() => {
    const onModalEscKeydown = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        onModalClose();
        onAddingProductSuccessModalClose();
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

  const onAddingProductSuccessModalOpen = () => {
    setAddingProductSuccessModalOpen(true);
    document.body.style.position = 'fixed';
  };

  const onAddingProductSuccessModalClose = () => {
    setAddingProductSuccessModalOpen(false);
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
        <p className="product-card__price" data-testid={'cardPrice'} style={{ fontFamily: 'Arial, sans-serif' }}>
          <span className="visually-hidden">Цена:</span>
          {`${price.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}`} &#x20BD;
        </p>
      </div>
      <div className="product-card__buttons">
        {addedProducts[id] > 0 ?
          <button className="btn btn--purple-border" onClick={() => navigate(AppRoute.Basket)}>
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-basket"></use>
            </svg>В корзине
          </button> :
          <button className="btn btn--purple product-card__btn" type="button" onClick={onModalOpen}>Купить
          </button>}
        <button className="btn btn--transparent" onClick={() => navigate(`/camera/${id}?tab=description`)}>Подробнее
        </button>
      </div>
      {/* @ts-expect-error children*/}
      <FocusTrap active={isModalOpen} focusTrapOptions={{ initialFocus: '#add-btn', onDeactivate: onModalClose }}>
        <PopupCatalogAddItem isModalOpen={isModalOpen} productCard={productCard} onModalClose={onModalClose} onAddingProductSuccessModalOpen={onAddingProductSuccessModalOpen} />
      </FocusTrap>
      {/* @ts-expect-error children*/}
      <FocusTrap active={isAddingProductSuccessModalOpen} focusTrapOptions={{ initialFocus: '#continue', onDeactivate: onAddingProductSuccessModalClose }}>
        <PopupCatalogAddItemSuccess isAddingProductSuccessModalOpen={isAddingProductSuccessModalOpen} onAddingProductSuccessModalClose={onAddingProductSuccessModalClose} />
      </FocusTrap>
    </div>
  );
}

export default ProductCardItem;
