import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CategoryFilter from './category-filter';

describe('Component: CategoryFilter', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <CategoryFilter />
      </ BrowserRouter>
    );

    expect(screen.getByText('Категория')).toBeInTheDocument();
    expect(screen.getByTestId('filterItem')).toBeInTheDocument();
  });
});
