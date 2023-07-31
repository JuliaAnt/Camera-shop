import { SubmitHandler, useForm } from 'react-hook-form';
import { Coupon } from '../../types/coupon';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { fetchDiscontAction } from '../../store/api-actions';
import { getAddedProducts, getCoupon } from '../../store/basket-data/basket-data-selectors';
import { addCoupon } from '../../store/basket-data/basket-data-slice';
import { useEffect, useState } from 'react';

function CouponComponent(): JSX.Element {
  const dispatch = useAppDispatch();
  const submittedCoupon = useAppSelector(getCoupon);
  const addedProducts = useAppSelector(getAddedProducts);

  const [currentCoupon, setCurrentCoupon] = useState<Coupon>({ coupon: '' });

  const onSubmit = (coupon: Coupon) => {
    dispatch(addCoupon(coupon));
    dispatch(fetchDiscontAction(coupon));
  };

  const { register, handleSubmit,
    clearErrors,
    formState: { errors, isValid, isSubmitted } } = useForm<Coupon>();

  const submitHandler: SubmitHandler<Coupon> = (data: Coupon) => {
    onSubmit({
      coupon: data.coupon,
    });
  };

  const totalAmount = Object.values(addedProducts).reduce((sum, amount) => sum + +amount, 0);

  useEffect(() => {
    if (totalAmount === 0) {
      setCurrentCoupon({ coupon: '' });
    }
  }, [dispatch, totalAmount]);

  let color = '';
  if (errors.coupon) {
    color = '#ed6041';
  } else if (submittedCoupon.coupon) {
    color = '#65cd54';
  }

  return (
    <div className="basket__promo">
      <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
      <div className="basket-form">
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form action="#" data-testid='promo-form' onSubmit={handleSubmit(submitHandler)}>
          <div className="custom-input">
            <label><span className="custom-input__label">Промокод</span>
              <input
                type="text"
                data-testid='basket-promo'
                placeholder="Введите промокод"
                value={submittedCoupon.coupon ? submittedCoupon.coupon : currentCoupon.coupon}
                disabled={Boolean(submittedCoupon.coupon)}
                style={{ borderColor: `${color}` }}
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
            {errors.coupon && <p role='alert' className="custom-input__error" style={{ opacity: 1 }}>{errors.coupon.message}</p>}
            {isSubmitted && isValid && submittedCoupon.coupon && <p className="custom-input__success" style={{ opacity: 1 }}>Промокод принят!</p>}
          </div>
          <button className="btn" type="submit" data-testid='promo-button' disabled={Boolean(submittedCoupon.coupon)}>Применить
          </button>
        </form>
      </div>
    </div>
  );
}

export default CouponComponent;
