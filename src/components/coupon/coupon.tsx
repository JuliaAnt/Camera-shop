import { SubmitHandler, useForm } from 'react-hook-form';
import { Coupon } from '../../types/coupon';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { fetchDiscontAction } from '../../store/api-actions';
import { useState } from 'react';

function CouponComponent(): JSX.Element {
  const dispatch = useAppDispatch();
  const [currentCoupon, setCurrentCoupon] = useState<Coupon>({ coupon: '' });
  const onSubmit = (coupon: Coupon) => {
    dispatch(fetchDiscontAction(coupon));
  };

  const { register, handleSubmit,
    clearErrors,
    formState: { errors } } = useForm<Coupon>();

  const submitHandler: SubmitHandler<Coupon> = (data: Coupon) => {
    onSubmit({
      coupon: data.coupon,
    });
  };

  return (
    <div className="basket__promo">
      <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
      <div className="basket-form">
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form action="#" onSubmit={handleSubmit(submitHandler)}>
          <div className="custom-input">
            <label><span className="custom-input__label">Промокод</span>
              <input
                type="text"
                placeholder="Введите промокод"
                value={currentCoupon.coupon}
                {...register('coupon', {
                  pattern: {
                    value: /^(camera-(333|444|555))$/,
                    message: 'Промокод неверный',
                  }
                })}
                onChange={(evt) => {
                  setCurrentCoupon({ coupon: evt.target.value });
                  clearErrors('coupon');
                }}
              />
            </label>
            {errors.coupon && <p role='alert' className="custom-input__error">{errors.coupon?.message}</p>}
            <p className="custom-input__success">Промокод принят!</p>
          </div>
          <button className="btn" type="submit">Применить
          </button>
        </form>
      </div>
    </div>
  );
}

export default CouponComponent;
