import { render, screen } from '@testing-library/react';
import ProductCardList from './product-card-list';
import { PRODUCTS_PER_PAGE } from '../../consts';
import { mockProductCards } from '../../mocks/mocks';
import { BrowserRouter } from 'react-router-dom';

describe('Component: ProductCardList', () => {
  it('should renders product card items correctly', () => {
    const firstProductIndex = 0;
    const lastProductIndex = PRODUCTS_PER_PAGE;
    const elementCount = mockProductCards.length;

    render(
      <BrowserRouter>
        <ProductCardList
          productCards={mockProductCards}
          firstProductIndex={firstProductIndex}
          lastProductIndex={lastProductIndex}
        />
      </BrowserRouter>
    );

    const productCardItems = screen.getAllByTestId('product-card-item');
    expect(productCardItems).toHaveLength(elementCount);
    expect(productCardItems[0]).toHaveTextContent('Click Sap');
    expect(productCardItems[0]).toHaveTextContent('9490');
    expect(productCardItems[1]).toHaveTextContent('Look 54');
    expect(productCardItems[1]).toHaveTextContent('96490');
    expect(productCardItems[2]).toHaveTextContent('Look SF3');
    expect(productCardItems[2]).toHaveTextContent('63800');
  });
});

