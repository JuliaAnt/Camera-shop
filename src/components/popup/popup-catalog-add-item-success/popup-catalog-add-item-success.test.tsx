import { fireEvent, render, screen } from '@testing-library/react';
import PopupCatalogAddItemSuccess from './popup-catalog-add-item-success';
import { BrowserRouter } from 'react-router-dom';

describe('PopupCatalogAddItemSuccess conponent', () => {
  test('renders PopupCatalogAddItemSuccess component correctly', () => {
    const isAddingProductSuccessModalOpen = true;
    const onAddingProductSuccessModalClose = jest.fn();

    render(
      <BrowserRouter>
        <PopupCatalogAddItemSuccess
          isAddingProductSuccessModalOpen={isAddingProductSuccessModalOpen}
          onAddingProductSuccessModalClose={onAddingProductSuccessModalClose}
        />
      </BrowserRouter>
    );

    const titleElement = screen.getByText('Товар успешно добавлен в корзину');
    const continueButton = screen.getByText('Продолжить покупки');
    const basketButton = screen.getByText('Перейти в корзину');
    const closeButton = screen.getByRole('button', { name: 'Закрыть попап' });

    expect(titleElement).toBeInTheDocument();
    expect(continueButton).toBeInTheDocument();
    expect(basketButton).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
  });

  test('calls onAddingProductSuccessModalClose when "Продолжить покупки" button is clicked', () => {
    const isAddingProductSuccessModalOpen = true;
    const onAddingProductSuccessModalClose = jest.fn();

    render(
      <BrowserRouter>
        <PopupCatalogAddItemSuccess
          isAddingProductSuccessModalOpen={isAddingProductSuccessModalOpen}
          onAddingProductSuccessModalClose={onAddingProductSuccessModalClose}
        />
      </BrowserRouter>
    );

    const continueButton = screen.getByText('Продолжить покупки');
    fireEvent.click(continueButton);

    expect(onAddingProductSuccessModalClose).toHaveBeenCalled();
  });

  test('calls onAddingProductSuccessModalClose when overlay is clicked', () => {
    const isAddingProductSuccessModalOpen = true;
    const onAddingProductSuccessModalClose = jest.fn();

    render(
      <BrowserRouter>
        <PopupCatalogAddItemSuccess
          isAddingProductSuccessModalOpen={isAddingProductSuccessModalOpen}
          onAddingProductSuccessModalClose={onAddingProductSuccessModalClose}
        />
      </BrowserRouter>
    );

    const overlay = screen.getByTestId('overlay');
    fireEvent.click(overlay);

    expect(onAddingProductSuccessModalClose).toHaveBeenCalled();
  });
});
