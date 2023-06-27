import { render, screen } from '@testing-library/react';
import SliderContent from './slider-content';
import { mockProductCards } from '../../../mocks/mocks';
import { BrowserRouter } from 'react-router-dom';

test('renders SliderContent component with correct number of products', () => {
  const firstProductIndex = 0;
  const lastProductIndex = 2;

  render(
    <BrowserRouter>
      <SliderContent
        firstProductIndex={firstProductIndex}
        lastProductIndex={lastProductIndex}
        similarProducts={mockProductCards}
      />
    </BrowserRouter>
  );

  const productCards = screen.getAllByTestId('product-card-item');
  expect(productCards).toHaveLength(lastProductIndex - firstProductIndex);

  mockProductCards
    .slice(firstProductIndex, lastProductIndex)
    .forEach((product, index) => expect(productCards[index]).toHaveTextContent(product.name));
});
