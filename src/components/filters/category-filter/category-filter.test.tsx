import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CategoryFilter from './category-filter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { CATEGORY_FILTER_MAP, NameSpace } from '../../../consts';

const mockStore = configureMockStore();

describe('Component: CategoryFilter', () => {
  it('should render correctly', () => {
    render(
      <Provider store={mockStore({
        [NameSpace.CatalogData]: {
          selectedFilters: [
            {
              filterType: 'price',
              filterValue: {
                from: null,
                to: null,
              },
            },
            {
              filterType: 'level',
              filterValue: [],
            },
            {
              filterType: 'type',
              filterValue: [],
            },
            {
              filterType: 'category',
              filterValue: [],
            },
          ]
        }
      })}
      >
        <BrowserRouter>
          <CategoryFilter />
        </ BrowserRouter>
      </Provider>
    );

    const elementCount = CATEGORY_FILTER_MAP.length;

    expect(screen.getByText('Категория')).toBeInTheDocument();
    expect(screen.getAllByTestId('filterItem')).toHaveLength(elementCount);
  });
});
