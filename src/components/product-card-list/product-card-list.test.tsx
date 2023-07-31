import { render, screen } from '@testing-library/react';
import ProductCardList from './product-card-list';
import { NameSpace, PRODUCTS_PER_PAGE } from '../../consts';
import { mockProductCards, mockReviews } from '../../mocks/mocks';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';

const mockStore = configureMockStore();

describe('Component: ProductCardList', () => {
  it('should renders product card items correctly', () => {
    const firstProductIndex = 0;
    const lastProductIndex = PRODUCTS_PER_PAGE;
    const elementCount = mockProductCards.length;

    render(
      <Provider store={mockStore({
        [NameSpace.CatalogData]: {
          allReviews: mockReviews,
        },
        [NameSpace.BasketData]: {
          productsInBasket: {},
        },
      })}
      >
        <BrowserRouter>
          <ProductCardList
            productCards={mockProductCards}
            firstProductIndex={firstProductIndex}
            lastProductIndex={lastProductIndex}
          />
        </BrowserRouter>
      </Provider>
    );

    const productCardItems = screen.getAllByTestId('product-card-item');
    expect(productCardItems).toHaveLength(elementCount);
    expect(productCardItems[0]).toHaveTextContent('Click Sap');
    expect(productCardItems[0]).toHaveTextContent('9 490');
    expect(productCardItems[1]).toHaveTextContent('Look 54');
    expect(productCardItems[1]).toHaveTextContent('96 490');
    expect(productCardItems[2]).toHaveTextContent('Look SF3');
    expect(productCardItems[2]).toHaveTextContent('63 800');
  });
});

