import { Link, useParams } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { fetchReviewsAction, fetchSelectedProductAction, fetchSimilarProductsAction } from '../../store/api-actions';
import { getSelectedProduct, getSimilarProducts } from '../../store/product-data/product-data-selectors';
import Tabs from '../../components/tabs/tabs';
import Slider from '../../components/slider/slider';
import { ProductCard } from '../../types/product-card';
import ReviewsList from '../../components/reviews-list/reviews-list';
import { AppRoute, RATINGS } from '../../consts';
import RatingItem from '../../components/rating-item/rating-item';
import PopupProductReview from '../../components/popup/popup-product-review/popup-product-review';
import PopupProductReviewSuccess from '../../components/popup/popup-product-review-success/popup-product-review-success';

export type ReviewData = {
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
}

function ProductPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { id: productId } = useParams<{ id: string }>();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSuccessModalActive, setSuccessModalActive] = useState<boolean>(false);
  const [reviewData, setReviewData] = useState<ReviewData>({
    userName: '',
    advantage: '',
    disadvantage: '',
    review: '',
    rating: 0,
  });

  const handleChange = (review: ReviewData) => {
    setReviewData(review);
  };

  useEffect(() => {
    if (productId) {
      dispatch(fetchSelectedProductAction(+productId));
      dispatch(fetchSimilarProductsAction(+productId));
      dispatch(fetchReviewsAction(+productId));
    }
  }, [dispatch, productId]);

  const selectedProduct: ProductCard | null = useAppSelector(getSelectedProduct);
  const similarProducts: ProductCard[] = useAppSelector(getSimilarProducts);

  const { name, price, vendorCode, level, type, category, description, reviewCount, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x } = selectedProduct || {};

  const handlerScrollUp = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  const rating = 2;

  useEffect(() => {
    const onModalEscKeydown = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        onModalClose();
        onSuccessModalClose();
      }
    };

    window.addEventListener('keydown', onModalEscKeydown);
    return () => window.removeEventListener('keydown', onModalEscKeydown);

  }, []);

  const onModalOpen = () => {
    setModalOpen(true);
    document.body.style.position = 'fixed';
  };

  const onModalClose = () => {
    setModalOpen(false);
    setReviewData({
      userName: '',
      advantage: '',
      disadvantage: '',
      review: '',
      rating: 0,
    });
    document.body.style.position = '';
  };

  const onSuccessModalOpen = () => {
    setSuccessModalActive(true);
    document.body.style.position = 'fixed';
  };

  const onSuccessModalClose = () => {
    setSuccessModalActive(false);
    document.body.style.position = '';
  };

  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="page-content" id='upPage'>
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
                <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">{name || ''}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="page-content__section">
            <section className="product">
              <div className="container">
                <div className="product__img">
                  <picture>
                    <source type="image/webp" srcSet={`${previewImgWebp || ''}, ${previewImgWebp2x || ''} 2x`} />
                    <img src={previewImg || ''} srcSet={`${previewImg2x || ''} 2x`} width="560" height="480" alt={name || ''} />
                  </picture>
                </div>
                <div className="product__content">
                  <h1 className="title title--h3" data-testid={'productTitle'}>{name || ''}</h1>
                  <div className="rate product__rate">
                    {RATINGS.map((reviewRating) => <RatingItem key={reviewRating} id={reviewRating} rating={rating} />)}
                    <p className="visually-hidden">Рейтинг: 4</p>
                    <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount || ''}</p>
                  </div>
                  <p className="product__price"><span className="visually-hidden">Цена:</span>{`${price || ''} ₽`}</p>
                  <button className="btn btn--purple" type="button">
                    <svg width="24" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-add-basket"></use>
                    </svg>Добавить в корзину
                  </button>
                  <Tabs vendorCode={vendorCode} description={description} level={level} type={type} category={category} />
                </div>
              </div >
            </section >
          </div >
          <div className="page-content__section">
            <section className="product-similar">
              {similarProducts && similarProducts.length !== 0 ? <Slider similarProducts={similarProducts} /> : ''}
            </section>
          </div>
          <div className="page-content__section">
            <section className="review-block">
              <ReviewsList onModalOpen={onModalOpen} />
            </section>
          </div>
        </div >
        <PopupProductReview isModalOpen={isModalOpen} reviewData={reviewData} onChangeReview={handleChange} onModalClose={onModalClose} onSuccessModalOpen={onSuccessModalOpen} />
        <PopupProductReviewSuccess isSuccessModalActive={isSuccessModalActive} onSuccessModalClose={onSuccessModalClose} />
      </main >
      <button className="up-btn" onClick={handlerScrollUp}>
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </button>
      <Footer />
    </div >
  );
}

export default ProductPage;
