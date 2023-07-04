import { useState } from 'react';
import { UseSliderReturn } from '../types/slider';

type UseSliderProps = {
  productsPerSlide: number;
  productsCount: number;
}

export const useSlider = ({ productsPerSlide, productsCount }: UseSliderProps): UseSliderReturn => {
  const [slide, setSlide] = useState(1);
  const [isSliding, setIsSliding] = useState(false);
  const totalSlideCount: number = Math.ceil(productsCount / productsPerSlide);
  const lastProductIndex = slide * productsPerSlide;
  const firstProductIndex = lastProductIndex - productsPerSlide;
  const [direction, setDirection] = useState<'prev' | 'next'>('next');

  const changeSlideWithDirection = (directionSkip: 'prev' | 'next') => {
    if (isSliding) {
      return;
    }

    setIsSliding(true);
    setDirection(directionSkip);

    setTimeout(() => {
      setSlide((currentSlide) => {
        if (directionSkip === 'next') {
          if (currentSlide === totalSlideCount) {
            return currentSlide;
          }
          return currentSlide + 1;
        } else {
          if (currentSlide === 1) {
            return currentSlide;
          }
          return currentSlide - 1;
        }
      });
      setIsSliding(false);
    }, 1000);
  };

  return {
    totalSlideCount,
    nextSlide: () => changeSlideWithDirection('next'),
    prevSlide: () => changeSlideWithDirection('prev'),
    firstProductIndex,
    lastProductIndex,
    slide,
    isSliding,
    direction,
  };
};
