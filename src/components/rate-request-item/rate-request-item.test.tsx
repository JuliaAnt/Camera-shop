import { render, fireEvent, screen } from '@testing-library/react';
import RateRequestItem from './rate-request-item';
import { BrowserRouter } from 'react-router-dom';

describe('Component: RateRequestItem', () => {
  const mockOnChange = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should renders correctly with selected rate', () => {
    const rating = 3;
    const title = 'Нормально';
    const isDisabledForm = false;
    const selectedRate = 3;

    render(
      <BrowserRouter>
        <RateRequestItem
          rating={rating}
          title={title}
          isDisabledForm={isDisabledForm}
          selectedRate={selectedRate}
          onChange={mockOnChange}
        />
      </BrowserRouter>
    );

    const inputElement: HTMLInputElement = screen.getByTestId(`rate-input-${rating}`);

    expect(inputElement).toBeInTheDocument();
    expect(inputElement.type).toBe('radio');
    expect(inputElement.value).toBe(rating.toString());
    expect(inputElement.checked).toBe(true);
    expect(inputElement.disabled).toBe(false);
  });

  it('handles rate change correctly', () => {
    const rating = 4;
    const title = 'Хорошо';
    const isDisabledForm = false;
    const selectedRate = 2;

    render(
      <RateRequestItem
        rating={rating}
        title={title}
        isDisabledForm={isDisabledForm}
        selectedRate={selectedRate}
        onChange={mockOnChange}
      />
    );

    const inputElement: HTMLInputElement = screen.getByTestId(`rate-input-${rating}`);

    fireEvent.click(inputElement);
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(rating);
  });

  it('disables the input when isDisabledForm is true', () => {
    const rating = 5;
    const title = 'Отлично';
    const isDisabledForm = true;
    const selectedRate = 5;

    render(
      <RateRequestItem
        rating={rating}
        title={title}
        isDisabledForm={isDisabledForm}
        selectedRate={selectedRate}
        onChange={mockOnChange}
      />
    );

    const inputElement: HTMLInputElement = screen.getByTestId(`rate-input-${rating}`);

    expect(inputElement.disabled).toBe(true);
  });
});
