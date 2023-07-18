import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SearchResultItem from './search-result-item';
import { look54Card } from '../../../mocks/mocks';

describe('SearchResultItem', () => {
  it('renders product name', () => {
    render(
      <BrowserRouter>
        <SearchResultItem product={look54Card} searchString="" tabIndex={0} activeClass='' setSelected={jest.fn()} setHovered={jest.fn()} />
      </BrowserRouter>
    );

    const productName = screen.getByText(look54Card.name);
    expect(productName).toBeInTheDocument();
  });

  it('renders hidden item if search string is empty', () => {
    render(
      <BrowserRouter>
        <SearchResultItem product={look54Card} searchString="" tabIndex={0} activeClass='' setSelected={jest.fn()} setHovered={jest.fn()} />
      </BrowserRouter>
    );

    const item = screen.getByTestId('search-item');
    expect(item).toHaveStyle({ visibility: 'hidden' });
  });

  it('renders visible item if search string is not empty', () => {
    render(
      <BrowserRouter>
        <SearchResultItem product={look54Card} searchString="Product" tabIndex={0} activeClass='' setSelected={jest.fn()} setHovered={jest.fn()} />
      </BrowserRouter>
    );

    const item = screen.getByTestId('search-item');
    expect(item).toHaveStyle({ visibility: 'visible' });
  });
});
