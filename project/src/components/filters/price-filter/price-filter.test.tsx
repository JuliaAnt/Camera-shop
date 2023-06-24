import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PriceFilter from './price-filter';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';

const mockStore = configureMockStore();

describe('Component: PriceFilter', () => {
  it('should render correctly', () => {
    render(
      <Provider store={mockStore({})}>
        <BrowserRouter>
          <PriceFilter />
        </ BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Цена, ₽')).toBeInTheDocument();
    expect(screen.getByTestId('priceRange')).toBeInTheDocument();
  });
});
