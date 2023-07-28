import FocusTrap from 'react-focus-trap';
import { ProductCard } from '../../types/product-card';
import PopupBasketRemoveItem from '../popup/popup-basket-remove-item/popup-basket-remove-item';
import { ChangeEvent, useState } from 'react';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { changeAmountProduct, decreaseAmountProduct, increaseAmountProduct } from '../../store/basket-data/basket-data-slice';

type BasketItemProps = {
  product: ProductCard;
  amount: number;
}

function BasketItem({ product, amount }: BasketItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { id, name, price, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, vendorCode, category, level, type } = product;
  const productCost = price * amount;
  const [isRemovingModalOpen, setRemovingModalOpen] = useState<boolean>(false);

  const onRemovingModalOpen = () => {
    setRemovingModalOpen(true);
    document.body.style.position = 'fixed';
  };

  const onRemovingModalClose = () => {
    setRemovingModalOpen(false);
    document.body.style.position = '';
  };

  const onNextButtonClick = () => {
    dispatch(increaseAmountProduct(id));
  };

  const onPrevButtonClick = () => {
    dispatch(decreaseAmountProduct(id));
  };

  const onAmountChange = (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeAmountProduct({ id: id, amount: +evt.target.value }));
  };

  return (
    <>
      <li key={id} className="basket-item">
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
        <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{`${price?.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}`} &#x20BD;</p>
        <div className="quantity">
          <button
            className="btn-icon btn-icon--prev"
            aria-label="уменьшить количество товара"
            disabled={Boolean(amount === 1)}
            onClick={onPrevButtonClick}
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
          <label className="visually-hidden" htmlFor="counter1"></label>
          <input type="number" id="counter1" value={amount} min="1" max="99" aria-label="количество товара" onChange={onAmountChange} />
          <button
            className="btn-icon btn-icon--next"
            aria-label="увеличить количество товара"
            disabled={Boolean(amount === 99)}
            onClick={onNextButtonClick}
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
        </div>
        <div className="basket-item__total-price">
          <span className="visually-hidden">Общая цена:</span>{`${productCost?.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}`} &#x20BD;
        </div>
        <button
          className="cross-btn"
          type="button"
          aria-label="Удалить товар"
          onClick={onRemovingModalOpen}
        >
          <svg width="10" height="10" aria-hidden="true">
            <use xlinkHref="#icon-close"></use>
          </svg>
        </button>
      </li>
      {/* @ts-expect-error children*/}
      <FocusTrap active={isRemovingModalOpen} focusTrapOptions={{ initialFocus: '#remove-button', onDeactivate: onRemovingModalClose }}>
        <PopupBasketRemoveItem product={product} onRemovingModalClose={onRemovingModalClose} isRemovingModalOpen={isRemovingModalOpen} />
      </FocusTrap>
    </>
  );
}

export default BasketItem;