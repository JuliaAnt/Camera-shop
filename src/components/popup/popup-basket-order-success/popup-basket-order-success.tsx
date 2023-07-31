type PopupBasketOrderSuccessProps = {
  isSuccessModalOpen: boolean;
  onSuccessModalClose: () => void;
}

function PopupBasketOrderSuccess({ isSuccessModalOpen, onSuccessModalClose }: PopupBasketOrderSuccessProps): JSX.Element {
  return (
    <div className={`modal${isSuccessModalOpen ? ' is-active' : ''} modal--narrow`}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={onSuccessModalClose}></div>
        <div className="modal__content">
          <p className="title title--h4">Спасибо за покупку</p>
          <svg className="modal__icon" width="80" height="78" aria-hidden="true">
            <use xlinkHref="#icon-review-success"></use>
          </svg>
          <div className="modal__buttons">
            <button className="btn btn--purple modal__btn modal__btn--fit-width" id="back-btn" type="button" onClick={onSuccessModalClose}>Вернуться к покупкам
            </button>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={onSuccessModalClose}>
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopupBasketOrderSuccess;
