import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './header';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <Header />
      </ BrowserRouter>
    );

    expect(screen.getByTestId('header-logo')).toBeInTheDocument();
    expect(screen.getByTestId('form-search')).toBeInTheDocument();
    expect(screen.getByTestId('header-main-nav')).toBeInTheDocument();
  });
});
