import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { ProductCard } from '../../types/product-card';
import { decreaseProductAmount, increaseProductAmount } from '../../store/basket-data/basket-data-slice';
import BasketItem from './basket-item';

const mockStore = configureMockStore([]);

describe('BasketItem', () => {
  const product: ProductCard = {
    id: 1,
    name: 'Test Product',
    previewImg: 'test.jpg',
    previewImg2x: 'test@2x.jpg',
    previewImgWebp: 'test.webp',
    previewImgWebp2x: 'test@2x.webp',
    vendorCode: '12345',
    category: 'Фотоаппарат',
    level: 'Beginner',
    type: 'Digital',
    description: 'fakeDescription',
    price: 100,
    reviewCount: 1
  };

  const amount = 2;

  it('should render BasketItem component', async () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <BasketItem product={product} amount={amount} />
      </Provider>
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Digital фотокамера')).toBeInTheDocument();
    expect(screen.getByText('Beginner уровень')).toBeInTheDocument();
    expect(screen.getByText('100 ₽')).toBeInTheDocument();
    expect(screen.getByText('200 ₽')).toBeInTheDocument();

    const quantityInput = screen.getByTestId('amount');
    await waitFor(() => expect(quantityInput).toHaveValue(2));
    const decreaseButton = screen.getByLabelText('уменьшить количество товара');
    const increaseButton = screen.getByLabelText('увеличить количество товара');
    expect(decreaseButton).toBeEnabled();
    expect(increaseButton).toBeEnabled();

    const removeButton = screen.getByLabelText('Удалить товар');
    expect(removeButton).toBeInTheDocument();
  });

  it('should dispatch decreaseAmountProduct action when the decrease button is clicked', () => {
    const store = mockStore({});
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <BasketItem product={product} amount={amount} />
      </Provider>
    );

    const decreaseButton = screen.getByLabelText('уменьшить количество товара');
    fireEvent.click(decreaseButton);

    expect(store.dispatch).toHaveBeenCalledWith(decreaseProductAmount(product.id));
  });

  it('should dispatch increaseAmountProduct action when the increase button is clicked', () => {
    const store = mockStore({});
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <BasketItem product={product} amount={amount} />
      </Provider>
    );

    const increaseButton = screen.getByLabelText('увеличить количество товара');
    fireEvent.click(increaseButton);

    expect(store.dispatch).toHaveBeenCalledWith(increaseProductAmount(product.id));
  });

  it('should open and close the remove item modal when the remove button is clicked', () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <BasketItem product={product} amount={amount} />
      </Provider>
    );

    const removeButton = screen.getByLabelText('Удалить товар');
    fireEvent.click(removeButton);

    expect(screen.getByLabelText('Закрыть попап')).toBeInTheDocument();

    const closeModalButton = screen.getByLabelText('Закрыть попап');
    fireEvent.click(closeModalButton);

    expect(screen.queryByLabelText('Закрыть попап')).not.toBeInTheDocument();
  });
});
