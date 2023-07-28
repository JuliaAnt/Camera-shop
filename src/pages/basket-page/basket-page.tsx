import { Link } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { AppRoute } from '../../consts';
import { useAppSelector } from '../../hooks/redux-hooks';
import { getAddedProducts, getDiscont } from '../../store/basket-data/basket-data-selectors';
import BasketList from '../../components/basket-list/basket-list';
import { getProducts } from '../../store/catalog-data/catalog-data-selectors';
import CouponComponent from '../../components/coupon-component/coupon-component';


function BasketPage(): JSX.Element {
  const addedProducts = useAppSelector(getAddedProducts);
  const products = useAppSelector(getProducts);
  const discont = useAppSelector(getDiscont);
  const ids = Object.keys(addedProducts);
  let totalCost = 0;
  ids.forEach((productId) => {
    const currentProduct = products.find((product) => product.id === +productId);
    if (currentProduct) {
      totalCost += currentProduct.price * addedProducts[+productId];
    }
    return totalCost;
  });

  const discontSum = Math.round(totalCost * (discont / 100));
  const totalCostWithDiscont = totalCost - discontSum;

  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={AppRoute.Catalog}>Главная
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={AppRoute.Catalog}>Каталог
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">Корзина</span>
                </li>
              </ul>
            </div>
          </div>
          <section className="basket">
            <div className="container">
              <h1 className="title title--h2">Корзина</h1>
              <BasketList addedProducts={addedProducts} />
              <div className="basket__summary">
                <CouponComponent />
                <div className="basket__summary-order">
                  <p className="basket__summary-item">
                    <span className="basket__summary-text">Всего:</span>
                    <span className="basket__summary-value">{`${totalCost ? totalCost?.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ') : 0}`} &#x20BD;</span>
                  </p>
                  <p className="basket__summary-item">
                    <span className="basket__summary-text">Скидка:</span>
                    <span className="basket__summary-value basket__summary-value--bonus" style={{ color: `${discontSum ? 'red' : 'black'}` }}>
                      {`${discontSum ? discontSum?.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ') : 0}`} &#x20BD;
                    </span>
                  </p>
                  <p className="basket__summary-item">
                    <span className="basket__summary-text basket__summary-text--total">К оплате:</span>
                    <span className="basket__summary-value basket__summary-value--total">
                      {`${totalCostWithDiscont ? totalCostWithDiscont?.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ') : 0}`} &#x20BD;
                    </span>
                  </p>
                  <button className="btn btn--purple" type="submit">Оформить заказ
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default BasketPage;
