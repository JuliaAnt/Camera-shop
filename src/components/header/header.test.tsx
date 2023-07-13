import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './header';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { mockProductCards } from '../../mocks/mocks';
import { NameSpace } from '../../consts';

const mockStore = configureMockStore();
describe('Component: Header', () => {
  it('should render correctly', () => {
    render(
      <Provider store={mockStore({
        [NameSpace.CatalogData]: {
          productCards: mockProductCards,
        }
      })}
      >
        <BrowserRouter>
          <Header />
        </ BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId('header-logo')).toBeInTheDocument();
    expect(screen.getByTestId('form-search')).toBeInTheDocument();
    expect(screen.getByTestId('header-main-nav')).toBeInTheDocument();
  });
});
