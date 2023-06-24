import { render, screen, fireEvent } from '@testing-library/react';
import Slider from './slider';
import { mockProductCards } from '../../mocks/mocks';
import { BrowserRouter } from 'react-router-dom';

describe('Slider', () => {

  test('renders slider component', () => {
    render(
      <BrowserRouter>
        <Slider similarProducts={mockProductCards} />
      </BrowserRouter>
    );

    const sliderElement = screen.getByRole('heading', { level: 2, name: 'Похожие товары' });
    expect(sliderElement).toBeInTheDocument();

    const prevButton = screen.getByLabelText('Предыдущий слайд');
    const nextButton = screen.getByLabelText('Следующий слайд');
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  test('slides to the next and previous slides', () => {
    render(
      <BrowserRouter>
        <Slider similarProducts={mockProductCards} />
      </BrowserRouter>
    );

    const firstProduct = screen.getByTestId(`cardTitle-${mockProductCards[0].id}`).innerHTML;
    expect(firstProduct).toMatch('Click Sap');

    const nextButton = screen.getByLabelText('Следующий слайд');
    fireEvent.click(nextButton);

    const secondProduct = screen.getByTestId(`cardTitle-${mockProductCards[1].id}`).innerHTML;
    expect(secondProduct).toMatch('Look 54');

    const prevButton = screen.getByLabelText('Предыдущий слайд');
    fireEvent.click(prevButton);

    expect(firstProduct).toMatch('Click Sap');
  });
});
