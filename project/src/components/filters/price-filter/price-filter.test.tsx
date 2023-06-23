import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PriceFilter from './price-filter';

describe('Component: PriceFilter', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <PriceFilter />
      </ BrowserRouter>
    );

    expect(screen.getByText('Цена, ₽')).toBeInTheDocument();
    expect(screen.getByTestId('filterItem')).toBeInTheDocument();
  });
});
