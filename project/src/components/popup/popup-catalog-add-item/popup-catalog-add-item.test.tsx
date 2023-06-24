import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PopupCatalogAddItem from './popup-catalog-add-item';
import { look54Card } from '../../../mocks/mocks';

describe('Component: popupCatalogAddItem', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <PopupCatalogAddItem
          isModalOpen
          productCard={look54Card}
          onModalClose={jest.fn()}
        />
      </BrowserRouter>
    );

    expect(screen.getByText('Добавить товар в корзину')).toBeInTheDocument();
    expect(screen.getByText('Look 54')).toBeInTheDocument();
    expect(screen.getByText('NB54Y')).toBeInTheDocument();
  });
});
