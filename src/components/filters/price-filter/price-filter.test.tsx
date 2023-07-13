import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PriceFilter from './price-filter';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace } from '../../../consts';
import { newMockSelectedFilters } from '../../../mocks/mocks';

const mockStore = configureMockStore();

describe('Component: PriceFilter', () => {
  it('should render correctly', () => {
    render(
      <Provider store={mockStore({
        [NameSpace.CatalogData]: {
          selectedFilters: newMockSelectedFilters,
          priceRange: {
            min: 1000,
            max: 10000,
          },
        }
      })}
      >
        <BrowserRouter>
          <PriceFilter />
        </ BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Цена, ₽')).toBeInTheDocument();
    expect(screen.getByTestId('priceRange')).toBeInTheDocument();
  });
});
