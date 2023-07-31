import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import BasketList from './basket-list';
import { mockProductCards } from '../../mocks/mocks';
import { NameSpace } from '../../consts';

const mockStore = configureMockStore([]);

describe('BasketList', () => {

  const addedProducts = {
    6: 2,
    7: 3,
    8: 0,
  };

  it('should render BasketList component', () => {
    const store = mockStore({
      [NameSpace.CatalogData]: {
        productCards: [mockProductCards[0], mockProductCards[1], mockProductCards[2]],
      },
    });

    render(
      <Provider store={store}>
        <BasketList addedProducts={addedProducts} />
      </Provider>
    );

    expect(screen.getByText('Click Sap')).toBeInTheDocument();
    expect(screen.getByText('Look 54')).toBeInTheDocument();
    expect(screen.queryByText('Look SF3')).not.toBeInTheDocument();
  });

  it('should not render BasketItem when the product amount is 0', () => {
    const store = mockStore({
      [NameSpace.CatalogData]: {
        productCards: [mockProductCards[0]],
      },
    });

    render(
      <Provider store={store}>
        <BasketList addedProducts={{ ...addedProducts, 6: 0 }} />
      </Provider>
    );

    expect(screen.queryByText('Click Sap')).not.toBeInTheDocument();
  });
});
