import { useEffect, useRef } from 'react';
import { ProductCard } from '../../../types/product-card';
// import { useFocusLoop } from '../../../hooks/use-focus-loop';

type PopupCatalogAddItemProps = {
  isModalOpen: boolean;
  productCard: ProductCard;
  onModalClose: () => void;
}

function PopupCatalogAddItem({ isModalOpen, productCard, onModalClose }: PopupCatalogAddItemProps): JSX.Element {
  const { name, vendorCode, type, category, level, price, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x } = productCard;
  const modalContainerRef = useRef<HTMLDivElement>(null);
  // const clickableElementRefs = useRef<Array<React.RefObject<HTMLElement>>>([]);

  // useFocusLoop(clickableElementRefs.current);

  useEffect(() => {
    if (isModalOpen && modalContainerRef.current) {
      modalContainerRef.current.focus();
    }
  }, [isModalOpen]);


  return (
    <div className={`modal${isModalOpen ? ' is-active' : ''}`}
      ref={modalContainerRef}
      tabIndex={-1}
    // autoFocus={isModalOpen}
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
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any */}
            <button className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
              autoFocus={isModalOpen}
            // ref={(ref) => clickableElementRefs.current.push(ref as any)}
            >
              <svg width="24" height="16" aria-hidden="true">
                <use xlinkHref="#icon-add-basket"></use>
              </svg>Добавить в корзину
            </button>
          </div>
          {/* eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any */}
          <button className="cross-btn" type="button" aria-label="Закрыть попап"
            // ref={(ref) => clickableElementRefs.current.push(ref as any)}
            onClick={onModalClose}
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

export default PopupCatalogAddItem;
