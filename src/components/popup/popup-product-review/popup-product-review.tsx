import { useState } from 'react';
import { ReviewRequest } from '../../../types/review';
import { useAppDispatch } from '../../../hooks/redux-hooks';
import { useParams } from 'react-router-dom';
import { fetchReviewsAction, sendReviewAction } from '../../../store/api-actions';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import RateRequestList from '../../rate-request-list/rate-request-list';
import { ReviewData } from '../../../pages/product-page/product-page';

type PopupProductReviewProps = {
  isModalOpen: boolean;
  reviewData: ReviewData;
  onChangeReview: (value: ReviewData) => void;
  onModalClose: () => void;
  onSuccessModalOpen: () => void;
}

function PopupProductReview({ isModalOpen, reviewData, onChangeReview, onModalClose, onSuccessModalOpen }: PopupProductReviewProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { id: productId } = useParams<{ id: string }>();
  const [isDisabledForm, setDisabled] = useState<boolean>(false);

  const onSubmit = (currentReview: ReviewRequest) => {
    setDisabled(true);
    dispatch(sendReviewAction({
      ...currentReview,
      onSuccess: () => {
        dispatch(fetchReviewsAction(productId ? +productId : 0));
        setDisabled(false);
        onModalClose();
        onSuccessModalOpen();
      },
      onError: () => {
        setDisabled(false);
      },
    }));
  };

  const { register, handleSubmit,
    control,
    clearErrors,
    formState: { errors } } = useForm<ReviewData>();

  const submitHandler: SubmitHandler<ReviewData> = (data: ReviewData) => {
    onSubmit({
      cameraId: productId ? +productId : 0,
      userName: data.userName,
      advantage: data.advantage,
      disadvantage: data.disadvantage,
      review: data.review,
      rating: data.rating,
    });
  };

  return (
    <div className={`modal${isModalOpen ? ' is-active' : ''}`}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={onModalClose}></div>
        <div className="modal__content">
          <p className="title title--h4">Оставить отзыв</p>
          <div className="form-review">
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <form method="post" onSubmit={handleSubmit(submitHandler)}>
              <div className="form-review__rate">
                <fieldset className="rate form-review__item">
                  <legend className="rate__caption">Рейтинг
                    <svg width="9" height="9" aria-hidden="true">
                      <use xlinkHref="#icon-snowflake"></use>
                    </svg>
                  </legend>
                  <div className="rate__bar">
                    <div className="rate__group">
                      <Controller
                        control={control}
                        name='rating'
                        rules={
                          { required: 'Нужно оценить товар' }
                        }
                        render={({ field }) => (
                          <RateRequestList isDisabledForm={isDisabledForm} selectedRate={reviewData.rating} onChange={(rating) => {
                            field.onChange(rating);
                            onChangeReview({ ...reviewData, rating: rating });
                          }}
                          />
                        )}
                      />
                    </div>
                    <div className="rate__progress"><span className="rate__stars">{reviewData.rating}</span> <span>/</span> <span className="rate__all-stars">5</span>
                    </div>
                  </div>
                  {errors.rating && <p role='alert' className="rate__message" style={{ opacity: 1 }}>{errors.rating.message}</p>}
                </fieldset>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">Ваше имя
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input
                      data-testid='name-input'
                      type="text"
                      id='name'
                      placeholder="Введите ваше имя"
                      disabled={isDisabledForm}
                      value={reviewData.userName}
                      {...register('userName', {
                        required: 'Нужно указать имя',
                        pattern: {
                          value: /^[А-Яа-яЁёA-Za-z'\- ]{1,}$/,
                          message: 'Invalid name'
                        }
                      })}
                      onChange={(evt) => {
                        onChangeReview({ ...reviewData, userName: evt.target.value });
                        clearErrors('userName');
                      }}
                    />
                  </label>
                  {errors.userName && <p role='alert' className="custom-input__error" style={{ opacity: 1 }}>{errors.userName?.message}</p>}
                </div>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">Достоинства
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input
                      data-testid='advantage'
                      type="text"
                      id='user-plus'
                      placeholder="Основные преимущества товара"
                      disabled={isDisabledForm}
                      value={reviewData.advantage}
                      {...register('advantage', {
                        required: 'Нужно указать достоинства',
                      })}
                      onChange={(evt) => {
                        onChangeReview({ ...reviewData, advantage: evt.target.value });
                        clearErrors('advantage');
                      }}
                    />
                  </label>
                  {errors.advantage && <p role='alert' className="custom-input__error" style={{ opacity: 1 }}>{errors.advantage.message}</p>}
                </div>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">Недостатки
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input
                      data-testid='disadvantage'
                      type="text"
                      id="user-minus"
                      placeholder="Главные недостатки товара"
                      disabled={isDisabledForm}
                      value={reviewData.disadvantage}
                      {...register('disadvantage', {
                        required: 'Нужно указать недостатки',
                      })}
                      onChange={(evt) => {
                        onChangeReview({ ...reviewData, disadvantage: evt.target.value });
                        clearErrors('disadvantage');
                      }}
                    />
                  </label>
                  {errors.disadvantage && <p role='alert' className="custom-input__error" style={{ opacity: 1 }}>{errors.disadvantage?.message}</p>}
                </div>
                <div className="custom-textarea form-review__item">
                  <label>
                    <span className="custom-textarea__label">Комментарий
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <textarea
                      data-testid='comment'
                      id="user-comment"
                      placeholder="Поделитесь своим опытом покупки"
                      disabled={isDisabledForm}
                      value={reviewData.review}
                      {...register('review', {
                        required: 'Нужно добавить комментарий',
                        minLength:
                        {
                          value: 5,
                          message: 'Введите не менее 5 символов',
                        }
                      })}
                      onChange={(evt) => {
                        onChangeReview({ ...reviewData, review: evt.target.value });
                        clearErrors('review');
                      }}
                    >
                    </textarea>
                  </label>
                  {errors.review && <div role='alert' className="custom-textarea__error" style={{ opacity: 1 }}>{errors.review?.message}</div>}
                </div>
              </div>
              <button className="btn btn--purple form-review__btn" type="submit">Отправить отзыв</button>
            </form>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" disabled={isDisabledForm} onClick={onModalClose}>
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div >
    </div >
  );
}

export default PopupProductReview;
