import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FilterItem from './filter-item';
import { CATEGORY_FILTER_MAP } from '../../consts';

const mockFilter = CATEGORY_FILTER_MAP[0];
const mockFilterValue = ['Фотоаппарат'];

describe('Component: CategoryFilter', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <FilterItem currentItem={mockFilter} currentFilterValue={mockFilterValue} onFilterChange={jest.fn()} />
      </ BrowserRouter>
    );

    expect(screen.getByText('Фотоаппарат')).toBeInTheDocument();
    expect(screen.getByTestId('filterItem')).toBeInTheDocument();
  });
});
