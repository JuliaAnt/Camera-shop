import { render, fireEvent, screen } from '@testing-library/react';
import PopupBasketOrderSuccess from './popup-basket-order-success';

describe('PopupBasketOrderSuccess', () => {
  test('should render the modal with correct content when isSuccessModalOpen is true', () => {
    render(
      <PopupBasketOrderSuccess
        isSuccessModalOpen
        onSuccessModalClose={jest.fn()}
      />
    );

    expect(screen.getByText('Спасибо за покупку')).toBeInTheDocument();
    expect(screen.getByText('Вернуться к покупкам')).toBeInTheDocument();

    const closeButton = screen.getByLabelText('Закрыть попап');
    expect(closeButton).toBeInTheDocument();
  });

  test('should call onSuccessModalClose when "Вернуться к покупкам" button is clicked', () => {
    const mockCloseModal = jest.fn();
    render(
      <PopupBasketOrderSuccess
        isSuccessModalOpen
        onSuccessModalClose={mockCloseModal}
      />
    );

    const backButton = screen.getByText('Вернуться к покупкам');
    fireEvent.click(backButton);

    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });

  test('should call onSuccessModalClose when overlay is clicked', () => {
    const mockCloseModal = jest.fn();
    render(
      <PopupBasketOrderSuccess
        isSuccessModalOpen
        onSuccessModalClose={mockCloseModal}
      />
    );

    const overlay = screen.getByLabelText('Закрыть попап');
    fireEvent.click(overlay);

    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });
});
