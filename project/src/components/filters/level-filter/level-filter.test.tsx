import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LevelFilter from './level-filter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { LEVEL_FILTER_MAP, NameSpace } from '../../../consts';

const mockStore = configureMockStore();

describe('Component: LevelFilter', () => {
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
          <LevelFilter />
        </ BrowserRouter>
      </Provider>
    );

    const elementCount = LEVEL_FILTER_MAP.length;

    expect(screen.getByText('Уровень')).toBeInTheDocument();
    expect(screen.getAllByTestId('filterItem')).toHaveLength(elementCount);
  });
});
