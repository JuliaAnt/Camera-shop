import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../consts';
import Search from '../search/search';
import { useAppSelector } from '../../hooks/redux-hooks';
import { getAddedProducts } from '../../store/basket-data/basket-data-selectors';

function Header(): JSX.Element {
  const navigate = useNavigate();
  const addedProducts = useAppSelector(getAddedProducts);
  const totalAmount = Object.values(addedProducts).reduce((sum, amount) => sum + +amount, 0);

  return (
    <header className="header" id="header" data-testid={'header'}>
      <div className="container">
        <Link className="header__logo" to={AppRoute.Catalog} aria-label="Переход на главную" data-testid={'header-logo'}>
          <svg width="100" height="36" aria-hidden="true">
            <use xlinkHref="#icon-logo"></use>
          </svg>
        </Link>
        <nav className="main-nav header__main-nav" data-testid={'header-main-nav'}>
          <ul className="main-nav__list">
            <li className="main-nav__item"><Link className="main-nav__link" to={'/?page=1'}>Каталог</Link>
            </li>
            <li className="main-nav__item"><Link className="main-nav__link" to="#">Гарантии</Link>
            </li>
            <li className="main-nav__item"><Link className="main-nav__link" to="#">Доставка</Link>
            </li>
            <li className="main-nav__item"><Link className="main-nav__link" to="#">О компании</Link>
            </li>
          </ul>
        </nav>
        <Search />
        <button className="header__basket-link" style={{ border: 'none', cursor: 'pointer' }} onClick={() => navigate(AppRoute.Basket)}>
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          {
            totalAmount > 0 ? <span className="header__basket-count">{totalAmount}</span> : null
          }
        </button>
      </div>
    </header>
  );
}

export default Header;
