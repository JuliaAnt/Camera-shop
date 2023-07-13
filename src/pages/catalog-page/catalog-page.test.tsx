import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { NameSpace } from '../../consts';
import CatalogPage from './catalog-page';
import thunk from 'redux-thunk';
import { api } from '../../store';
import { look54Card, mockAllReviews, mockProductCards } from '../../mocks/mocks';

const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);

describe('Component: CatalogPage', () => {
  it('should render correctly', () => {

    render(
      <React.StrictMode>
        <Provider store={mockStore({
          [NameSpace.CatalogData]: {
            filteredCards: mockProductCards,
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
            ],
            sorts: {
              sortType: 'sortPopular',
              sortOrder: 'up',
            },
            promoProduct: look54Card,
            hasError: false,
            priceRange: {
              min: null,
              max: null,
            },
            page: 1,
            allReviews: mockAllReviews,
          }
        })}
        >
          <BrowserRouter>
            <CatalogPage />
          </ BrowserRouter>
        </Provider>
      </ React.StrictMode >
    );

    expect(screen.getByTestId('cardTitle-6').innerHTML).toMatch('Click Sap');
    expect(screen.getByText('Каталог фото- и видеотехники')).toBeInTheDocument();
    expect(screen.getByTestId('bannerTitle').innerHTML).toMatch('Look 54');
    expect(screen.getByText('Сортировать:')).toBeInTheDocument();
    expect(screen.getByText(/Цена, ₽/i)).toBeInTheDocument();
    expect(screen.getByText(/Сбросить фильтры/i)).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });
});
