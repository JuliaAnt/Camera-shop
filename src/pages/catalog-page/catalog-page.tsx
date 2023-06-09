import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { getErrorStatus, getFilteredProducts, getLoadingStatus, getPaginationPage, getPromoProduct, getSelectedFilters, getSorts } from '../../store/catalog-data/catalog-data-selectors';
import { fetchProductsAction, fetchPromoProductAction } from '../../store/api-actions';
import ProductCardList from '../../components/product-card-list/product-card-list';
import Filters from '../../components/filters/filters';
import Sort from '../../components/sort/sort';
import Banner from '../../components/banner/banner';
import Pagination from '../../components/pagination/pagination';
import { AppRoute, FilterTypeList, PRODUCTS_PER_PAGE } from '../../consts';
import { usePagination } from '../../hooks/use-pagination';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { Link, useSearchParams } from 'react-router-dom';
import EmptyCatalogPage from '../empty-catalog-page/empty-catalog-page';
import LoadingScreen from '../loading-screen/loading-screen';
import { SelectedFilter } from '../../types/filters';
import { checkEmptyFilters } from '../../utils/utils';
import { changeAllSelectedFiltersAction, changePageAction, changeSortsAction } from '../../store/catalog-data/catalog-data-slice';
import { SortsType } from '../../types/sorts';

function CatalogPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const products = useAppSelector(getFilteredProducts);
  const promoProduct = useAppSelector(getPromoProduct);
  const hasError = useAppSelector(getErrorStatus);
  const isLoading = useAppSelector(getLoadingStatus);
  const selectedFilters = useAppSelector(getSelectedFilters);
  const [searchParams, setSearchParams] = useSearchParams();
  const paginationPage = useAppSelector(getPaginationPage);
  const selectedSort = useAppSelector(getSorts);

  const {
    firstProductIndex,
    lastProductIndex,
    totalPageCount,
    nextPage,
    prevPage,
    setPage,
    page,
  } = usePagination({ productsPerPage: PRODUCTS_PER_PAGE, productsCount: products.length });

  useEffect(() => {
    const newSearchParams = selectedFilters.reduce((params, filter) => {
      if (filter.filterType !== 'price') {
        if (filter.filterValue.length) {
          const filterType = filter.filterType;
          const filterValue = filter.filterValue;
          params[filterType as string] = filterValue;
        }
      } else {
        if (filter.filterValue.from) {
          params['price_from'] = filter.filterValue.from.toString();
        }
        if (filter.filterValue.to) {
          params['price_to'] = filter.filterValue.to.toString();
        }
      }
      return params;

    }, {} as Record<string, string[] | string>);

    newSearchParams['page'] = paginationPage.toString();
    if (selectedSort.sortType) {
      newSearchParams['sortType'] = selectedSort.sortType;
    }
    if (selectedSort.sortOrder) {
      newSearchParams['sortOrder'] = selectedSort.sortOrder;
    }

    setSearchParams(newSearchParams);
  }, [selectedFilters, paginationPage, selectedSort, setSearchParams]);

  useEffect(() => {
    const filtersFromUrl: SelectedFilter[] = [
      {
        filterType: FilterTypeList.Category,
        filterValue: searchParams.get(FilterTypeList.Category) || '',
      },
      {
        filterType: FilterTypeList.Type,
        filterValue: searchParams.getAll(FilterTypeList.Type) || [],
      },
      {
        filterType: FilterTypeList.Level,
        filterValue: searchParams.getAll(FilterTypeList.Level) || [],
      },
      {
        filterType: FilterTypeList.Price,
        filterValue: {
          from: +(searchParams.get('price_from') || '0'),
          to: +(searchParams.get('price_to') || '0'),
        },
      },
    ];

    const sortFromUrl: SortsType = {
      sortType: searchParams.get('sortType') || '',
      sortOrder: searchParams.get('sortOrder') || '',
    };

    if (checkEmptyFilters(selectedFilters)) {
      dispatch(changeAllSelectedFiltersAction(filtersFromUrl));
    }

    const pageParam = searchParams.get('page');
    if (pageParam && pageParam !== page.toString()) {
      if (+pageParam > totalPageCount) {
        dispatch(changePageAction(+totalPageCount));
      } else if (+pageParam < 1) {
        dispatch(changePageAction(1));
      } else {
        dispatch(changePageAction(+pageParam));
      }
    }

    if (!selectedSort.sortType && !selectedSort.sortOrder) {
      dispatch(changeSortsAction(sortFromUrl));
    }
  }, []);

  useEffect(() => {
    dispatch(fetchProductsAction());
    dispatch(fetchPromoProductAction());
  }, [dispatch]);

  const promoProductCard = products.find((product) => product.id === promoProduct?.id);

  if (hasError) {
    return <EmptyCatalogPage promoProduct={promoProduct} promoProductCard={promoProductCard} />;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

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
                    <Sort />
                  </div>
                  <ProductCardList productCards={products} firstProductIndex={firstProductIndex} lastProductIndex={lastProductIndex} />
                  <div className="pagination">
                    <Pagination totalPageCount={totalPageCount} nextPage={nextPage} prevPage={prevPage} setPage={setPage} page={page} />
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
