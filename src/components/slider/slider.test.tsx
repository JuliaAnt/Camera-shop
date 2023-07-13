import { render, screen, fireEvent } from '@testing-library/react';
import Slider, { CustomLeftArrow, CustomRightArrow } from './slider';
import { mockProductCards, mockReviews } from '../../mocks/mocks';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace } from '../../consts';

const mockStore = configureMockStore();

describe('Slider component', () => {
  it('should render the Slider component with product cards', () => {
    render(
      <Provider store={mockStore({
        [NameSpace.CatalogData]: {
          allReviews: mockReviews,
        }
      })}
      >
        <BrowserRouter>
          <Slider similarProducts={mockProductCards} />
        </BrowserRouter>
      </Provider>
    );

    const productCards = screen.getAllByTestId('product-card-item');
    expect(productCards).toHaveLength(mockProductCards.length);
  });

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


// describe('Slider', () => {

//   test('renders slider component', () => {
//     render(
//       <BrowserRouter>
//         <Slider similarProducts={mockProductCards} />
//       </BrowserRouter>
//     );

//     const sliderElement = screen.getByRole('heading', { level: 2, name: 'Похожие товары' });
//     expect(sliderElement).toBeInTheDocument();

//     const prevButton = screen.getByLabelText('Предыдущий слайд');
//     const nextButton = screen.getByLabelText('Следующий слайд');
//     expect(prevButton).toBeInTheDocument();
//     expect(nextButton).toBeInTheDocument();
//   });

//   test('slides to the next and previous slides', () => {
//     render(
//       <BrowserRouter>
//         <Slider similarProducts={mockProductCards} />
//       </BrowserRouter>
//     );

//     const firstProduct = screen.getByTestId(`cardTitle-${mockProductCards[0].id}`).innerHTML;
//     expect(firstProduct).toMatch('Click Sap');

//     const nextButton = screen.getByLabelText('Следующий слайд');
//     fireEvent.click(nextButton);

//     const secondProduct = screen.getByTestId(`cardTitle-${mockProductCards[1].id}`).innerHTML;
//     expect(secondProduct).toMatch('Look 54');

//     const prevButton = screen.getByLabelText('Предыдущий слайд');
//     fireEvent.click(prevButton);

//     expect(firstProduct).toMatch('Click Sap');
//   });
// });
