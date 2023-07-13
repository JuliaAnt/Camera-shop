import { useRef, useState } from 'react';
import { ProductCard } from '../../types/product-card';
import ProductCardItem from '../product-card-item/product-card-item';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { PRODUCTS_PER_SLIDE } from '../../consts';
import { getAllReviews } from '../../store/catalog-data/catalog-data-selectors';
import { useAppSelector } from '../../hooks/redux-hooks';

type SliderProps = {
  similarProducts: ProductCard[];
}

type CustomArrowProps = {
  onClick: () => void;
  totalSlidesCount: number;
  slide: number;
}

export const CustomLeftArrow = ({ onClick, totalSlidesCount, slide }: CustomArrowProps) => (
  <button
    className="slider-controls slider-controls--prev"
    type="button"
    aria-label="Предыдущий слайд"
    disabled={Boolean(slide === 0)}
    style={{ pointerEvents: `${slide === 0 ? 'none' : 'auto'}` }}
    onClick={() => onClick()}
  >
    <svg width="7" height="12" aria-hidden="true">
      <use xlinkHref="#icon-arrow"></use>
    </svg>
  </button>
);

export const CustomRightArrow = ({ onClick, totalSlidesCount, slide }: CustomArrowProps) => (
  <button
    className="slider-controls slider-controls--next"
    type="button"
    aria-label="Следующий слайд"
    disabled={Boolean(slide === totalSlidesCount - 1)}
    style={{ pointerEvents: `${slide === (totalSlidesCount - 1) ? 'none' : 'auto'}` }}
    onClick={() => onClick()}
  >
    <svg width="7" height="12" aria-hidden="true">
      <use xlinkHref="#icon-arrow"></use>
    </svg>
  </button>
);

function Slider({ similarProducts }: SliderProps): JSX.Element {
  const allReviews = useAppSelector(getAllReviews);
  const carouselRef = useRef<Carousel>(null);
  const [slide, setCurrentSlide] = useState(0);

  const totalSlidesCount = Math.ceil(similarProducts.length / PRODUCTS_PER_SLIDE);

  const handleNextClick = () => {
    carouselRef.current?.next(3);
  };

  const handlePrevClick = () => {
    carouselRef.current?.previous(3);
  };

  return (
    <div className="container">
      <h2 className="title title--h3">Похожие товары</h2>
      <div className="product-similar__slider">
        <Carousel
          afterChange={(previousSlide, { currentSlide }) => {
            setCurrentSlide(Math.floor(currentSlide / 3));
          }}
          ref={carouselRef}
          additionalTransfrom={0}
          arrows={false}
          autoPlaySpeed={3000}
          centerMode={false}
          className="product-similar__slider-list"
          containerClass="sliderContainer"
          dotListClass=""
          customTransition={'transform 1300ms'}
          draggable={false}
          focusOnSelect={false}
          infinite={false}
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024
              },
              items: 3,
              partialVisibilityGutter: 40
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0
              },
              items: 1,
              partialVisibilityGutter: 30
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464
              },
              items: 2,
              partialVisibilityGutter: 30
            }
          }}
          ssr
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          sliderClass=""
          slidesToSlide={3}
          swipeable
        >
          {
            similarProducts.map((similarProduct) => {
              const reviewsById = allReviews[similarProduct.id];
              return <ProductCardItem key={similarProduct.id} productCard={similarProduct} className={'is-active'} reviews={reviewsById} />;
            })
          }
        </Carousel>

        <CustomLeftArrow onClick={handlePrevClick} slide={slide} totalSlidesCount={totalSlidesCount} />
        <CustomRightArrow onClick={handleNextClick} slide={slide} totalSlidesCount={totalSlidesCount} />

      </div>
    </div >
  );
}

export default Slider;
