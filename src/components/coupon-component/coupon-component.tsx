import { Coupon } from '../../types/coupon';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { fetchDiscontAction } from '../../store/api-actions';
import { getAddedProducts, getCoupon } from '../../store/basket-data/basket-data-selectors';
import { addCoupon } from '../../store/basket-data/basket-data-slice';
import { KeyboardEvent, useEffect, useState } from 'react';

function CouponComponent(): JSX.Element {
  const dispatch = useAppDispatch();
  const submittedCoupon = useAppSelector(getCoupon);
  const addedProducts = useAppSelector(getAddedProducts);

  const [currentCoupon, setCurrentCoupon] = useState<Coupon>({ coupon: '' });
  const [couponStatusMessage, setCouponStatusMessage] = useState<string>('');

  const onSubmit = () => {
    dispatch(fetchDiscontAction({
      coupon: currentCoupon,
      onSuccess: () => {
        dispatch(addCoupon(currentCoupon));
        setCouponStatusMessage('Промокод принят!');
      },
      onError: () => {
        setCouponStatusMessage('Промокод неверный');
      }
    }));
  };

  const totalAmount = Object.values(addedProducts).reduce((sum, amount) => sum + +amount, 0);

  useEffect(() => {
    if (totalAmount === 0) {
      setCurrentCoupon({ coupon: '' });
      setCouponStatusMessage('');
    }
  }, [dispatch, totalAmount]);

  let color = '';
  if (couponStatusMessage === 'Промокод неверный') {
    color = '#ed6041';
  } else if (submittedCoupon.coupon) {
    color = '#65cd54';
  }

  const onKeyDown = (evt: KeyboardEvent) => {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="basket__promo">
      <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
      <div className="basket-form">
        <form data-testid='promo-form'>
          <div className="custom-input">
            <label><span className="custom-input__label">Промокод</span>
              <input
                type="text"
                data-testid='basket-promo'
                placeholder="Введите промокод"
                value={submittedCoupon.coupon ? submittedCoupon.coupon : currentCoupon.coupon}
                disabled={Boolean(submittedCoupon.coupon)}
                style={{ borderColor: `${color}` }}
                onChange={(evt) => {
                  setCurrentCoupon({ coupon: evt.target.value });
                }}
                onKeyDown={onKeyDown}
              />
            </label>
            {couponStatusMessage === 'Промокод принят!' ? <p className="custom-input__success" style={{ opacity: 1 }}>{couponStatusMessage}</p>
              : <p className="custom-input__error" style={{ opacity: 1 }}>{couponStatusMessage}</p>}
          </div>
          <button className="btn" type="button" data-testid='promo-button' disabled={Boolean(submittedCoupon.coupon)} onClick={onSubmit}>Применить
          </button>
        </form>
      </div>
    </div>
  );
}

export default CouponComponent;
