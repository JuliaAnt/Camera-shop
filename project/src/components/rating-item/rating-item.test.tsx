import { render, screen } from '@testing-library/react';
import RatingItem from './rating-item';

describe('RatingItem', () => {
  it('renders a filled star when the id is less than or equal to the rating', () => {
    const id = 4;
    const rating = 4;

    render(
      <RatingItem id={id} rating={rating} />
    );

    const starIcon = screen.getByTestId('star-icon');
    expect(starIcon.getAttribute('xlink:href')).toBe('#icon-full-star');
  });

  it('renders an empty star when the id is greater than the rating', () => {
    const id = 3;
    const rating = 2;

    render(
      <RatingItem id={id} rating={rating} />
    );

    const starIcon = screen.getByTestId('star-icon');
    expect(starIcon.getAttribute('xlink:href')).toBe('#icon-star');
  });
});
