export type UseSliderReturn = {
  totalSlideCount: number;
  nextSlide: () => void;
  prevSlide: () => void;
  firstProductIndex: number;
  lastProductIndex: number;
  slide: number;
  isSliding: boolean;
  direction: 'prev' | 'next';
}
