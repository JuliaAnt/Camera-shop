import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../../consts';

type PopupCatalogAddItemSuccessProps = {
  isAddingProductSuccessModalOpen: boolean;
  onAddingProductSuccessModalClose: () => void;
}

function PopupCatalogAddItemSuccess({ isAddingProductSuccessModalOpen, onAddingProductSuccessModalClose }: PopupCatalogAddItemSuccessProps): JSX.Element {
  const navigate = useNavigate();

  const onBasketButtonClick = () => {
    onAddingProductSuccessModalClose();
    navigate(AppRoute.Basket);
  };

  return (
    <div className={`modal modal--narrow${isAddingProductSuccessModalOpen ? ' is-active' : ''}`}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={onAddingProductSuccessModalClose}></div>
        <div className="modal__content">
          <p className="title title--h4">Товар успешно добавлен в корзину</p>
          <svg className="modal__icon" width="86" height="80" aria-hidden="true">
            <use xlinkHref="#icon-success"></use>
          </svg>
          <div className="modal__buttons">
            <button className="btn btn--transparent modal__btn" id='continue' onClick={onAddingProductSuccessModalClose}>Продолжить покупки</button>
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              onClick={onBasketButtonClick}
            >Перейти в корзину
            </button>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={onAddingProductSuccessModalClose}>
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopupCatalogAddItemSuccess;
