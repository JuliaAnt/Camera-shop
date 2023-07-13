import { screen, fireEvent, render } from '@testing-library/react';
import Search from './search';
import { Provider } from 'react-redux';
import { NameSpace } from '../../consts';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { BrowserRouter } from 'react-router-dom';

const mockProducts = [
  { id: 1, name: 'Product 1' },
  { id: 2, name: 'Product 2' },
  { id: 3, name: 'Product 3' },
];

const mockStore = configureMockStore();


describe('Search', () => {

  it('should render search input', () => {

    render(
      <Provider store={mockStore({
        [NameSpace.CatalogData]: {
          productCards: mockProducts,
        }
      })}
      >
        <BrowserRouter>
          <Search />
        </BrowserRouter>
      </Provider>
    );

    const searchInput = screen.getByTestId('search-bar');
    expect(searchInput).toBeInTheDocument();
  });

  it('should update search results list on input change', () => {
    render(
      <Provider store={mockStore({
        [NameSpace.CatalogData]: {
          productCards: mockProducts,
        }
      })}
      >
        <BrowserRouter>
          <Search />
        </BrowserRouter>
      </Provider>
    );

    const searchInput = screen.getByTestId('search-bar');
    fireEvent.change(searchInput, { target: { value: 'Product' } });

    const searchResults = screen.getAllByTestId('search-item');
    expect(searchResults.length).toBe(3);
  });

  it('should clear search input on reset button click', () => {
    render(
      <Provider store={mockStore({
        [NameSpace.CatalogData]: {
          productCards: mockProducts,
        }
      })}
      >
        <BrowserRouter>
          <Search />
        </BrowserRouter>
      </Provider>
    );
    const searchInput: HTMLInputElement = screen.getByTestId('search-bar');


    fireEvent.change(searchInput, { target: { value: 'Product' } });
    const resetButton = screen.getByTestId('search-reset-btn');
    expect(searchInput.value).toBe('product');

    fireEvent.click(resetButton);
    expect(searchInput.value).toBe('');
  });
});
