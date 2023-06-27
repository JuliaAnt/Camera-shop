import { render, screen } from '@testing-library/react';
import RateRequestList from './rate-request-list';
import { RATINGS_REQUEST } from '../../consts';

describe('Component: RateRequestList', () => {
  const mockOnChange = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders all rate request items correctly', () => {
    const isDisabledForm = false;
    const selectedRate = 3;

    render(
      <RateRequestList
        isDisabledForm={isDisabledForm}
        selectedRate={selectedRate}
        onChange={mockOnChange}
      />
    );

    const rateInputList = screen.getAllByTestId(/rate-input/i);
    expect(rateInputList.length).toBe(5);

    for (let i = 0; i < RATINGS_REQUEST.length; i++) {
      const title = RATINGS_REQUEST[i].title;
      expect(screen.getByTitle(title)).toBeInTheDocument();
    }
  });
});
