import { useAppDispatch } from '../../../hooks/redux-hooks';
import { addProductsToBasket } from '../../../store/basket-data/basket-data-slice';
import { ProductCard } from '../../../types/product-card';

type PopupCatalogAddItemProps = {
  isModalOpen: boolean;
  productCard: ProductCard;
  onModalClose: () => void;
  onAddingProductSuccessModalOpen: () => void;
}

function PopupCatalogAddItem({ isModalOpen, productCard, onModalClose, onAddingProductSuccessModalOpen }: PopupCatalogAddItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { id, name, vendorCode, type, category, level, price, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x } = productCard;

  const onAddingButtonClick = () => {
    dispatch(addProductsToBasket(id));
    onModalClose();
    onAddingProductSuccessModalOpen();
  };

  return (
    <div
      className={`modal${isModalOpen ? ' is-active' : ''}`}
    >
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={onModalClose}></div>
        <div className="modal__content">
          <p className="title title--h4">Добавить товар в корзину</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`} />
                <img src={previewImg} srcSet={`${previewImg2x} 2x`} width="140" height="120" alt={name} />
              </picture>
            </div>
            <div className="basket-item__description">
              <p className="basket-item__title">{name}</p>
              <ul className="basket-item__list">
                <li className="basket-item__list-item">
                  <span className="basket-item__article">Артикул: </span>
                  <span className="basket-item__number">{vendorCode}</span>
                </li>
                <li className="basket-item__list-item">{`${type} ${category === 'Фотоаппарат' ? 'фотокамера' : 'видеокамера'}`}</li>
                <li className="basket-item__list-item">{`${level} уровень`}</li>
              </ul>
              <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{`${price} ₽`}</p>
            </div>
          </div>
          <div className="modal__buttons">
            <button
              id='add-btn'
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
              tabIndex={0}
              onClick={onAddingButtonClick}
            >
              <svg width="24" height="16" aria-hidden="true">
                <use xlinkHref="#icon-add-basket"></use>
              </svg>Добавить в корзину
            </button>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            tabIndex={0}
            onClick={onModalClose}
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div >

  );
}

export default PopupCatalogAddItem;
