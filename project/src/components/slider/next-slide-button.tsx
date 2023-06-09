type NextSlideButtonProps = {
  totalSlideCount: number;
  nextSlide: () => void;
  slide: number;
}

function NextSlideButton({ slide, totalSlideCount, nextSlide }: NextSlideButtonProps): JSX.Element {
  return (
    <button
      className="slider-controls slider-controls--next"
      type="button"
      aria-label="Следующий слайд"
      disabled={Boolean(slide === totalSlideCount)}
      onClick={nextSlide}
    >
      <svg width="7" height="12" aria-hidden="true">
        <use xlinkHref="#icon-arrow"></use>
      </svg>
    </button>
  );
}

export default NextSlideButton;
