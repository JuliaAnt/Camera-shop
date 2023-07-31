import { useAppDispatch } from '../../../hooks/redux-hooks';
import { removeProductsFromBasket } from '../../../store/basket-data/basket-data-slice';
import { ProductCard } from '../../../types/product-card';

type PopupBasketRemoveItemProps = {
  product: ProductCard;
  isRemovingModalOpen: boolean;
  onRemovingModalClose: () => void;
}

function PopupBasketRemoveItem({ product, isRemovingModalOpen, onRemovingModalClose }: PopupBasketRemoveItemProps): JSX.Element {
  const { id, name, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, vendorCode, category, level, type } = product;
  const dispatch = useAppDispatch();

  const onRemoveButtonClick = () => {
    dispatch(removeProductsFromBasket(id));
    onRemovingModalClose();
  };

  return (
    <div key={id} className={`modal${isRemovingModalOpen ? ' is-active' : ''}`}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={onRemovingModalClose}></div>
        <div className="modal__content" style={{ width: '490px' }}>
          <p className="title title--h4">Удалить этот товар?</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`} />
                <img src={previewImg} srcSet={`${previewImg2x} 2x`} width="140" height="120" alt={`${category} ${name}`} />
              </picture>
            </div>
            <div className="basket-item__description">
              <p className="basket-item__title">{name}</p>
              <ul className="basket-item__list">
                <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{vendorCode}</span>
                </li>
                <li className="basket-item__list-item">{`${type} ${category === 'Фотоаппарат' ? 'фотокамера' : 'видеокамера'}`}</li>
                <li className="basket-item__list-item">{`${level} уровень`}</li>
              </ul>
            </div>
          </div>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--half-width"
              type="button"
              id="remove-button"
              onClick={onRemoveButtonClick}
            >Удалить
            </button>
            <button
              className="btn btn--transparent modal__btn modal__btn--half-width"
              onClick={onRemovingModalClose}
            >Продолжить покупки
            </button>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={onRemovingModalClose}
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopupBasketRemoveItem;
