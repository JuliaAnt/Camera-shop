import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCardItem from './product-card-item';
import { look54Card } from '../../mocks/mocks';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace } from '../../consts';

const mockStore = configureMockStore();

describe('Component: ProductCardItem', () => {
  it('should render correctly', () => {
    render(
      <Provider store={mockStore({
        [NameSpace.BasketData]: {
          productsInBasket: {},
        },
      })}
      >
        <BrowserRouter>
          <ProductCardItem productCard={look54Card} className='' reviews={[]} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId('cardTitle-7').innerHTML).toMatch('Look 54');
    expect(screen.getByText('Подробнее')).toBeInTheDocument();
    expect(screen.getByText('Купить')).toBeInTheDocument();
    expect(screen.getByTestId('cardPrice').innerHTML).toMatch('96 490 ₽');
  });
});
