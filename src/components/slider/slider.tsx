import { PRODUCTS_PER_SLIDE } from '../../consts';
import { useSlider } from '../../hooks/use-slider';
import { ProductCard } from '../../types/product-card';
import SliderContent from './slider-content/slider-content';

type SliderProps = {
  similarProducts: ProductCard[];
}

function Slider({ similarProducts }: SliderProps): JSX.Element {
  const {
    totalSlideCount,
    nextSlide,
    prevSlide,
    firstProductIndex,
    lastProductIndex,
    slide,
  } = useSlider({ productsCount: similarProducts.length, productsPerSlide: PRODUCTS_PER_SLIDE });

  return (
    <div className="container">
      <h2 className="title title--h3">Похожие товары</h2>
      <div className="product-similar__slider">
        <SliderContent firstProductIndex={firstProductIndex} lastProductIndex={lastProductIndex} similarProducts={similarProducts} />
        <button
          className="slider-controls slider-controls--prev"
          type="button"
          aria-label="Предыдущий слайд"
          disabled={Boolean(slide === 1)}
          style={{ pointerEvents: `${slide === 1 ? 'none' : 'auto'}` }}
          onClick={prevSlide}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <button
          className="slider-controls slider-controls--next"
          type="button"
          aria-label="Следующий слайд"
          disabled={Boolean(slide === totalSlideCount)}
          style={{ pointerEvents: `${slide === totalSlideCount ? 'none' : 'auto'}` }}
          onClick={nextSlide}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Slider;
