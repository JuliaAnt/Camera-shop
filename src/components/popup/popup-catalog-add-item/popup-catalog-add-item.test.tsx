import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PopupCatalogAddItem from './popup-catalog-add-item';
import { look54Card } from '../../../mocks/mocks';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace } from '../../../consts';

const mockStore = configureMockStore();

describe('Component: popupCatalogAddItem', () => {
  it('should render correctly', () => {
    render(
      <Provider store={mockStore({
        [NameSpace.BasketData]: {
          productsInBasket: {},
        },
      })}
      >
        <BrowserRouter>
          <PopupCatalogAddItem
            isModalOpen
            productCard={look54Card}
            onModalClose={jest.fn()}
            onAddingProductSuccessModalOpen={jest.fn()}
          />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Добавить товар в корзину')).toBeInTheDocument();
    expect(screen.getByText('Look 54')).toBeInTheDocument();
    expect(screen.getByText('NB54Y')).toBeInTheDocument();
  });
});
