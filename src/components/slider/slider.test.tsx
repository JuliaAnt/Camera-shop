import { render, screen, fireEvent } from '@testing-library/react';
import { CustomLeftArrow, CustomRightArrow } from './slider';

describe('Slider component', () => {
  it('should render the custom left arrow button', () => {
    render(<CustomLeftArrow onClick={jest.fn()} slide={0} totalSlidesCount={3} />);

    const leftArrowButton = screen.getByLabelText('Предыдущий слайд');
    expect(leftArrowButton).toBeInTheDocument();
  });

  it('should render the custom right arrow button', () => {
    render(<CustomRightArrow onClick={jest.fn()} slide={0} totalSlidesCount={3} />);

    const rightArrowButton = screen.getByLabelText('Следующий слайд');
    expect(rightArrowButton).toBeInTheDocument();
  });

  it('should call onClick when custom left arrow button is clicked', () => {
    const onClickMock = jest.fn();
    render(<CustomLeftArrow onClick={onClickMock} slide={1} totalSlidesCount={3} />);

    const leftArrowButton = screen.getByLabelText('Предыдущий слайд');
    fireEvent.click(leftArrowButton);

    expect(onClickMock).toHaveBeenCalled();
  });

  it('should call onClick when custom right arrow button is clicked', () => {
    const onClickMock = jest.fn();
    render(<CustomRightArrow onClick={onClickMock} slide={0} totalSlidesCount={3} />);

    const rightArrowButton = screen.getByLabelText('Следующий слайд');
    fireEvent.click(rightArrowButton);

    expect(onClickMock).toHaveBeenCalled();
  });
});
