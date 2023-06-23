type PopupProductReviewSuccessProps = {
  isSuccessModalActive: boolean;
  onSuccessModalClose: () => void;
}

function PopupProductReviewSuccess({ isSuccessModalActive, onSuccessModalClose }: PopupProductReviewSuccessProps): JSX.Element {
  return (
    <div className={`modal modal--narrow${isSuccessModalActive ? ' is-active' : ''}`}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={onSuccessModalClose}></div>
        <div className="modal__content">
          <p className="title title--h4">Спасибо за отзыв</p>
          <svg className="modal__icon" width="80" height="78" aria-hidden="true">
            <use xlinkHref="#icon-review-success"></use>
          </svg>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
              onClick={onSuccessModalClose}
            >Вернуться к покупкам
            </button>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={onSuccessModalClose}
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

export default PopupProductReviewSuccess;
