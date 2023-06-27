import { useState } from 'react';
import { UseSliderReturn } from '../types/slider';

type UseSliderProps = {
  productsPerSlide: number;
  productsCount: number;
}

export const useSlider = ({ productsPerSlide, productsCount }: UseSliderProps): UseSliderReturn => {
  const [slide, setSlide] = useState(1);
  const totalSlideCount: number = Math.ceil(productsCount / productsPerSlide);
  const lastProductIndex = slide * productsPerSlide;
  const firstProductIndex = lastProductIndex - productsPerSlide;

  const changeSlideWithDirection = (direction: boolean) => {
    setSlide((currentSlide) => {
      if (direction) {
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
  };

  return {
    totalSlideCount,
    nextSlide: () => changeSlideWithDirection(true),
    prevSlide: () => changeSlideWithDirection(false),
    firstProductIndex,
    lastProductIndex,
    slide,
  };
};
