import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import ReviewsList from './reviews-list';
import { mockReviews } from '../../mocks/mocks';
import { NameSpace } from '../../consts';

const mockStore = configureMockStore([]);

describe('ReviewsList', () => {
  it('renders the reviews list', () => {
    const store = mockStore({
      [NameSpace.ProductData]: {
        productReviews: mockReviews,
      },
    });

    render(
      <Provider store={store}>
        <ReviewsList onModalOpen={jest.fn()} />
      </Provider>
    );

    const reviewItems = screen.getAllByTestId('review-item');
    expect(reviewItems.length).toBe(mockReviews.length);
  });

  it('shows more reviews when "Показать больше отзывов" button is clicked', () => {
    const store = mockStore({
      [NameSpace.ProductData]: {
        productReviews: mockReviews,
      },
    });

    render(
      <Provider store={store}>
        <ReviewsList onModalOpen={jest.fn()} />
      </Provider>
    );

    const reviewItems = screen.getAllByTestId('review-item');
    expect(reviewItems.length).toBe(3);
    const showMoreButton = screen.getByText('Показать больше отзывов');
    fireEvent.click(showMoreButton);
    const updatedReviewItems = screen.getAllByTestId('review-item');
    expect(updatedReviewItems.length).toBe(mockReviews.length > 3 && mockReviews.length <= 6 ? 6 : mockReviews.length);
  });
});
