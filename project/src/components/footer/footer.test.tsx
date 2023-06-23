import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './footer';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <Footer />
      </ BrowserRouter>
    );

    expect(screen.getByText('Интернет-магазин фото- и видеотехники')).toBeInTheDocument();
    expect(screen.getByTestId('footer-nav')).toBeInTheDocument();
  });
});
