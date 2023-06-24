import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Banner from './banner';
import { look54Card, mockPromoProduct } from '../../mocks/mocks';

describe('Component: Banner', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <Banner promoProduct={mockPromoProduct} promoProductCard={look54Card} />
      </ BrowserRouter>
    );

    expect(screen.getByText('Подробнее')).toBeInTheDocument();
    expect(screen.getByTestId('bannerTitle').innerHTML).toMatch('Look 54');
    expect(screen.getByTestId('bannerDescription').innerHTML).toMatch('fakeDescription');
  });
});
