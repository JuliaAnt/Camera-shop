import { render, fireEvent, screen } from '@testing-library/react';
import PopupBasketOrderSuccess from './popup-basket-order-success';
import { BrowserRouter } from 'react-router-dom';

describe('PopupBasketOrderSuccess', () => {
  test('should render the modal with correct content when isSuccessModalOpen is true', () => {
    render(
      <BrowserRouter>
        <PopupBasketOrderSuccess
          isSuccessModalOpen
          onSuccessModalClose={jest.fn()}
        />
      </BrowserRouter>
    );

    expect(screen.getByText('Спасибо за покупку')).toBeInTheDocument();
    expect(screen.getByText('Вернуться к покупкам')).toBeInTheDocument();

    const closeButton = screen.getByLabelText('Закрыть попап');
    expect(closeButton).toBeInTheDocument();
  });

  test('should call onSuccessModalClose when "Вернуться к покупкам" button is clicked', () => {
    const mockCloseModal = jest.fn();
    render(
      <BrowserRouter>
        <PopupBasketOrderSuccess
          isSuccessModalOpen
          onSuccessModalClose={mockCloseModal}
        />
      </BrowserRouter>
    );

    const backButton = screen.getByText('Вернуться к покупкам');
    fireEvent.click(backButton);

    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });

  test('should call onSuccessModalClose when overlay is clicked', () => {
    const mockCloseModal = jest.fn();
    render(
      <BrowserRouter>
        <PopupBasketOrderSuccess
          isSuccessModalOpen
          onSuccessModalClose={mockCloseModal}
        />
      </BrowserRouter>
    );

    const overlay = screen.getByLabelText('Закрыть попап');
    fireEvent.click(overlay);

    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });
});
