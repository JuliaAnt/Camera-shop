import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FilterItem from './filter-item';
import { CATEGORY_FILTER_MAP } from '../../consts';

const mockFilter = CATEGORY_FILTER_MAP[0];
const mockFilterValue = ['Фотоаппарат'];

describe('Component: FilterItem', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <FilterItem currentItem={mockFilter} currentFilterValue={mockFilterValue} onFilterChange={jest.fn()} disabled={false} />
      </ BrowserRouter>
    );

    expect(screen.getByText('Фотокамера')).toBeInTheDocument();
    expect(screen.getByTestId('filterItem')).toBeInTheDocument();
  });
});
