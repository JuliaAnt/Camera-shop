import { renderHook } from '@testing-library/react';
import { PRODUCTS_PER_SLIDE } from '../consts';
import { useSlider } from './useSlider';

describe('Hook: useSlider', () => {
  it('should return correct data', () => {
    const { result } = renderHook(() => {
      const useSliderReturn = useSlider({ productsPerSlide: PRODUCTS_PER_SLIDE, productsCount: 14 });
      return useSliderReturn;
    });
    expect(result.current).toEqual(expect.objectContaining({
      totalSlideCount: 5,
      firstProductIndex: 0,
      lastProductIndex: 3,
      slide: 1,
    }));
  });
});
