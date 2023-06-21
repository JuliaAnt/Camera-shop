import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { getFilteredProducts, getPromoProduct } from '../../store/catalog-data/catalog-data-selectors';
import { fetchProductsAction, fetchPromoProductAction } from '../../store/api-actions';
import ProductCardList from '../../components/product-card-list/product-card-list';
import Filters from '../../components/filters/filters';
import Sorts from '../../components/sorts/sorts';
import Banner from '../../components/banner/banner';
import Pagination from '../../components/pagination/pagination';
import { AppRoute, PRODUCTS_PER_PAGE } from '../../consts';
import { usePagination } from '../../hooks/usePagination';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { Link } from 'react-router-dom';

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
      <Header />
      <main>
        {!!promoProduct && promoProductCard && <Banner promoProduct={promoProduct} promoProductCard={promoProductCard} />}
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
                  </div>
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

export default CatalogPage;
