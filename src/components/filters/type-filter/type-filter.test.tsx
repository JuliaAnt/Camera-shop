import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TypeFilter from './type-filter';
import { NameSpace, TYPE_FILTER_MAP } from '../../../consts';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';

const mockStore = configureMockStore();

describe('Component: TypeFilter', () => {
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
          <TypeFilter />
        </ BrowserRouter>
      </Provider>
    );

    const elementCount = TYPE_FILTER_MAP.length;

    expect(screen.getByText('Тип камеры')).toBeInTheDocument();
    expect(screen.getAllByTestId('filterItem')).toHaveLength(elementCount);
  });
});
