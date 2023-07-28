import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { addError } from '../../store/basket-data/basket-data-slice';

function OrderErrorPage(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <div className="wrapper">
      <main style={{ background: 'url(../img/fon-fotoapparat-404.jpg)', backgroundSize: 'cover' }}>
        <div style={{ margin: '20%' }}>
          <h1 className="title title--h2" style={{ marginBottom: '10px' }}>Не удалось оформить заказ!</h1>
          <h1 className="title title--h3" style={{ marginBottom: '20px' }}>Попробуйте ещё раз</h1>
          <button
            className="btn btn--purple modal__btn modal__btn--half-width"
            style={{ width: '200px' }}
            onClick={() => { navigate(AppRoute.Catalog); dispatch(addError(false)); }}
          >На главную страницу
          </button>
          <button
            className="btn btn--purple modal__btn modal__btn--half-width"
            style={{ width: '200px' }}
            onClick={() => { navigate(AppRoute.Basket); dispatch(addError(false)); }}
          >Вернуться в корзину
          </button>
        </div>
      </main>
    </div >
  );

}

export default OrderErrorPage;
