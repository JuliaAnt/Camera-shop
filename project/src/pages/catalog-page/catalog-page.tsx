import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { getFilteredProducts, getPromoProduct } from '../../store/catalog-data/catalog-data-selectors';
import { fetchProductsAction, fetchPromoProductAction } from '../../store/api-actions';
import ProductCardList from '../../components/product-card-list/product-card-list';
import Filters from '../../components/filters/filters';
import Sorts from '../../components/sorts/sorts';
import Banner from '../../components/banner/banner';
import Pagination from '../../components/pagination/pagination';
import { PRODUCTS_PER_PAGE } from '../../consts';
import { usePagination } from '../../hooks/usePagination';

function CatalogPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const products = useAppSelector(getFilteredProducts);
  const promoProduct = useAppSelector(getPromoProduct);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(fetchProductsAction());
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(fetchPromoProductAction());
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  const promoProductCard = products.find((product) => product.id === promoProduct?.id);

  const {
    firstProductIndex,
    lastProductIndex,
    totalPageCount,
    nextPage,
    prevPage,
    setPage,
    page,
  } = usePagination({ productsPerPage: PRODUCTS_PER_PAGE, productsCount: products.length });

  return (
    <div className="wrapper">
      <header className="header" id="header">
        <div className="container">
          <a className="header__logo" href="index.html" aria-label="Переход на главную">
            <svg width="100" height="36" aria-hidden="true">
              <use xlinkHref="#icon-logo"></use>
            </svg>
          </a>
          <nav className="main-nav header__main-nav">
            <ul className="main-nav__list">
              <li className="main-nav__item"><a className="main-nav__link" href="catalog.html">Каталог</a>
              </li>
              <li className="main-nav__item"><a className="main-nav__link" href="#">Гарантии</a>
              </li>
              <li className="main-nav__item"><a className="main-nav__link" href="#">Доставка</a>
              </li>
              <li className="main-nav__item"><a className="main-nav__link" href="#">О компании</a>
              </li>
            </ul>
          </nav>
          <div className="form-search">
            <form>
              <label>
                <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-lens"></use>
                </svg>
                <input className="form-search__input" type="text" autoComplete="off" placeholder="Поиск по сайту" />
              </label>
              <ul className="form-search__select-list">
                <li className="form-search__select-item" tabIndex={0}>Cannonball Pro MX 8i</li>
                <li className="form-search__select-item" tabIndex={0}>Cannonball Pro MX 7i</li>
                <li className="form-search__select-item" tabIndex={0}>Cannonball Pro MX 6i</li>
                <li className="form-search__select-item" tabIndex={0}>Cannonball Pro MX 5i</li>
                <li className="form-search__select-item" tabIndex={0}>Cannonball Pro MX 4i</li>
              </ul>
            </form>
            <button className="form-search__reset" type="reset">
              <svg width="10" height="10" aria-hidden="true">
                <use xlinkHref="#icon-close"></use>
              </svg><span className="visually-hidden">Сбросить поиск</span>
            </button>
          </div>
          <a className="header__basket-link" href="#">
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-basket"></use>
            </svg>
          </a>
        </div>
      </header>
      <main>
        {!!promoProduct && promoProductCard && <Banner promoProduct={promoProduct} promoProductCard={promoProductCard} />}
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link" href="index.html">Главная
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </a>
                </li>
                <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">Каталог</span>
                </li>
              </ul>
            </div>
          </div>
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <div className="catalog-filter">
                    <Filters />
                  </div>
                </div>
                <div className="catalog__content">
                  <div className="catalog-sort">
                    <Sorts />
                  </div>
                  <ProductCardList productCards={products} firstProductIndex={firstProductIndex} lastProductIndex={lastProductIndex} />
                  <div className="pagination">
                    <Pagination products={products} totalPageCount={totalPageCount} nextPage={nextPage} prevPage={prevPage} setPage={setPage} page={page} />
                    {/* <ul className="pagination__list">
                      <li className="pagination__item"><a className="pagination__link pagination__link--active" href="1">1</a>
                      </li>
                      <li className="pagination__item"><a className="pagination__link" href="2">2</a>
                      </li>
                      <li className="pagination__item"><a className="pagination__link" href="3">3</a>
                      </li>
                      <li className="pagination__item"><a className="pagination__link pagination__link--text" href="2">Далее</a>
                      </li>
                    </ul> */}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <footer className="footer">
        <div className="container">
          <div className="footer__info">
            <a className="footer__logo" href="index.html" aria-label="Переход на главную">
              <svg width="100" height="36" aria-hidden="true">
                <use xlinkHref="#icon-logo-mono"></use>
              </svg>
            </a>
            <p className="footer__description">Интернет-магазин фото- и видеотехники</p>
            <ul className="social">
              <li className="social__item">
                <a className="link" href="#" aria-label="Переход на страницу вконтатке">
                  <svg width="20" height="20" aria-hidden="true">
                    <use xlinkHref="#icon-vk"></use>
                  </svg>
                </a>
              </li>
              <li className="social__item">
                <a className="link" href="#" aria-label="Переход на страницу pinterest">
                  <svg width="20" height="20" aria-hidden="true">
                    <use xlinkHref="#icon-pinterest"></use>
                  </svg>
                </a>
              </li>
              <li className="social__item">
                <a className="link" href="#" aria-label="Переход на страницу reddit">
                  <svg width="20" height="20" aria-hidden="true">
                    <use xlinkHref="#icon-reddit"></use>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          <ul className="footer__nav">
            <li className="footer__nav-item">
              <p className="footer__title">Навигация</p>
              <ul className="footer__list">
                <li className="footer__item">
                  <a className="link" href="#">Каталог
                  </a>
                </li>
                <li className="footer__item">
                  <a className="link" href="#">Гарантии
                  </a>
                </li>
                <li className="footer__item">
                  <a className="link" href="#">Доставка
                  </a>
                </li>
                <li className="footer__item">
                  <a className="link" href="#">О компании
                  </a>
                </li>
              </ul>
            </li>
            <li className="footer__nav-item">
              <p className="footer__title">Ресурсы</p>
              <ul className="footer__list">
                <li className="footer__item">
                  <a className="link" href="#">Курсы операторов
                  </a>
                </li>
                <li className="footer__item">
                  <a className="link" href="#">Блог
                  </a>
                </li>
                <li className="footer__item">
                  <a className="link" href="#">Сообщество
                  </a>
                </li>
              </ul>
            </li>
            <li className="footer__nav-item">
              <p className="footer__title">Поддержка</p>
              <ul className="footer__list">
                <li className="footer__item">
                  <a className="link" href="#">FAQ
                  </a>
                </li>
                <li className="footer__item">
                  <a className="link" href="#">Задать вопрос
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default CatalogPage;
