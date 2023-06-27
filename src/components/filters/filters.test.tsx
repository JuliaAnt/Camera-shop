import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { NameSpace } from '../../consts';
import Filters from './filters';

const mockStore = configureMockStore();

describe('Component: Filters', () => {
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
          <Filters />
        </ BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Сбросить фильтры')).toBeInTheDocument();
    expect(screen.getByText('Фильтр')).toBeInTheDocument();
  });
});
