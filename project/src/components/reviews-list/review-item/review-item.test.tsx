import { render, screen } from '@testing-library/react';
import ReviewItem from './review-item';
import { mockReviews } from '../../../mocks/mocks';


describe('Component: ReviewItem', () => {
  test('renders the review item with correct data', () => {
    render(<ReviewItem reviewData={mockReviews[0]} />);

    const userNameElement = screen.getByText('Кирилл');
    expect(userNameElement).toBeInTheDocument();
    const ratingItems = screen.getAllByTestId('star-icon');
    expect(ratingItems.length).toBe(5);
    const advantageTextElement = screen.getByText('Достоинства:');
    expect(advantageTextElement).toBeInTheDocument();
    const advantageElement = screen.getByText('Легкая в плане веса, удобная в интерфейсе');
    expect(advantageElement).toBeInTheDocument();
    const disadvantageTextElement = screen.getByText('Недостатки:');
    expect(disadvantageTextElement).toBeInTheDocument();
    const disadvantageElement = screen.getByText('Быстро садиться зарядка');
    expect(disadvantageElement).toBeInTheDocument();
    const reviewTextElement = screen.getByText('Комментарий:');
    expect(reviewTextElement).toBeInTheDocument();
    const reviewElement = screen.getByText('Это моя первая камера. Я в восторге, нареканий нет');
    expect(reviewElement).toBeInTheDocument();
  });
});
