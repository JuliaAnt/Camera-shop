import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import PopupProductReview from './popup-product-review';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace } from '../../../consts';

const mockReviewData = {
  userName: '',
  advantage: '',
  disadvantage: '',
  review: '',
  rating: 0,
};

const setup = () => {
  const onChangeReviewMock = jest.fn();
  const utils = render(
    <Provider store={mockStore({
      [NameSpace.ProductData]: {
        selectedProduct: {
          name: 'Ретрокамера Dus Auge lV',
          vendorCode: 'DA4IU67AD5',
        },
        productReviews: [],
        similarProducts: [{
          name: 'Instaprinter P2',
          id: 48498,
        }],
      }
    })}
    >
      <PopupProductReview
        isModalOpen
        reviewData={mockReviewData}
        onChangeReview={onChangeReviewMock}
        onModalClose={jest.fn()}
        onSuccessModalOpen={jest.fn()}
      />
    </Provider>
  );
  const userNameInput: HTMLInputElement = screen.getByTestId('name-input');
  const userAdvantageInput: HTMLInputElement = screen.getByTestId('advantage');
  const userDisadvantageInput: HTMLInputElement = screen.getByTestId('disadvantage');
  const userCommentInput: HTMLInputElement = screen.getByTestId('comment');
  const userRateInput: HTMLInputElement = screen.getByTestId('rate-input-5');

  return { utils, userNameInput, userAdvantageInput, userDisadvantageInput, userCommentInput, userRateInput, onChangeReviewMock };
};

const mockStore = configureMockStore();

describe('Component: PopupProductReview', () => {
  it('should render correctly', () => {

    render(
      <React.StrictMode>
        <Provider store={mockStore({
          [NameSpace.ProductData]: {
            selectedProduct: {
              name: 'Ретрокамера Dus Auge lV',
              vendorCode: 'DA4IU67AD5',
            },
            productReviews: [],
            similarProducts: [{
              name: 'Instaprinter P2',
              id: 64654,
            }],
          }
        })}
        >
          <BrowserRouter>
            <PopupProductReview
              isModalOpen
              reviewData={mockReviewData}
              onChangeReview={jest.fn()}
              onModalClose={jest.fn()}
              onSuccessModalOpen={jest.fn()}
            />
          </ BrowserRouter>
        </Provider>
      </ React.StrictMode>
    );

    expect(screen.getByText('Оставить отзыв')).toBeInTheDocument();
    expect(screen.getByText('Рейтинг')).toBeInTheDocument();
    expect(screen.getByLabelText(/Ваше имя/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Достоинства/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Недостатки/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Комментарий/i)).toBeInTheDocument();
    expect(screen.getByText('Отправить отзыв')).toBeInTheDocument();
  });

  it('should change when user enter text', () => {
    const rendered = setup();

    expect(rendered.userNameInput.value).toBe('');
    expect(rendered.userAdvantageInput.value).toBe('');
    expect(rendered.userDisadvantageInput.value).toBe('');
    expect(rendered.userCommentInput.value).toBe('');
    expect(rendered.userRateInput.value).toBe('5');

    fireEvent.change(rendered.userNameInput, { target: { value: 'fakeName' } });
    fireEvent.change(rendered.userAdvantageInput, { target: { value: 'fakeAdvantage' } });
    fireEvent.change(rendered.userDisadvantageInput, { target: { value: 'fakeDisadvantage' } });
    fireEvent.change(rendered.userCommentInput, { target: { value: 'fakeReview' } });
    fireEvent.click(rendered.userRateInput);

    expect(rendered.onChangeReviewMock).toHaveBeenCalledWith({
      userName: 'fakeName',
      advantage: '',
      disadvantage: '',
      review: '',
      rating: 0,
    });
    expect(rendered.onChangeReviewMock).toHaveBeenCalledWith({
      userName: '',
      advantage: 'fakeAdvantage',
      disadvantage: '',
      review: '',
      rating: 0,
    });
    expect(rendered.onChangeReviewMock).toHaveBeenCalledWith({
      userName: '',
      advantage: '',
      disadvantage: 'fakeDisadvantage',
      review: '',
      rating: 0,
    });
    expect(rendered.onChangeReviewMock).toHaveBeenCalledWith({
      userName: '',
      advantage: '',
      disadvantage: '',
      review: 'fakeReview',
      rating: 0,
    });
    expect(rendered.onChangeReviewMock).toHaveBeenCalledWith({
      userName: '',
      advantage: '',
      disadvantage: '',
      review: '',
      rating: 5,
    });
  });
});
