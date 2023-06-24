import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PopupProductReviewSuccess from './popup-product-review-success';

describe('Component: PopupProductReviewSuccess', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <PopupProductReviewSuccess
          isSuccessModalActive
          onSuccessModalClose={jest.fn()}
        />
      </BrowserRouter>
    );

    expect(screen.getByText('Спасибо за отзыв')).toBeInTheDocument();
    expect(screen.getByText('Вернуться к покупкам')).toBeInTheDocument();
  });
});
