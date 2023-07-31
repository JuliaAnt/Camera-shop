import { render, fireEvent, screen } from '@testing-library/react';
import { useAppDispatch } from '../../../hooks/redux-hooks';
import { removeProductsFromBasket } from '../../../store/basket-data/basket-data-slice';
import { ProductCard } from '../../../types/product-card';
import PopupBasketRemoveItem from './popup-basket-remove-item';

jest.mock('../../../hooks/redux-hooks', () => ({
  useAppDispatch: jest.fn(),
}));

jest.mock('../../../store/basket-data/basket-data-slice', () => ({
  removeProductsFromBasket: jest.fn(),
}));

const mockDispatch = jest.fn();

describe('PopupBasketRemoveItem', () => {
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
    price: 1000,
    reviewCount: 1
  };

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render the modal with product details', () => {
    render(
      <PopupBasketRemoveItem
        product={product}
        isRemovingModalOpen
        onRemovingModalClose={jest.fn()}
      />
    );

    expect(screen.getByText('Удалить этот товар?')).toBeInTheDocument();
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Артикул:')).toBeInTheDocument();
    expect(screen.getByText('12345')).toBeInTheDocument();
    expect(screen.getByAltText('Фотоаппарат Test Product')).toBeInTheDocument();
  });

  test('should call onRemovingModalClose when "Продолжить покупки" button is clicked', () => {
    const mockCloseModal = jest.fn();
    render(
      <PopupBasketRemoveItem
        product={product}
        isRemovingModalOpen
        onRemovingModalClose={mockCloseModal}
      />
    );

    const continueShoppingButton = screen.getByText('Продолжить покупки');
    fireEvent.click(continueShoppingButton);

    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });

  test('should call removeProductsFromBasket and onRemovingModalClose when "Удалить" button is clicked', () => {
    const mockCloseModal = jest.fn();
    render(
      <PopupBasketRemoveItem
        product={product}
        isRemovingModalOpen
        onRemovingModalClose={mockCloseModal}
      />
    );

    const removeButton = screen.getByText('Удалить');
    fireEvent.click(removeButton);

    expect(mockDispatch).toHaveBeenCalledWith(removeProductsFromBasket(product.id));
    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });

  test('should call onRemovingModalClose when "Закрыть попап" button is clicked', () => {
    const mockCloseModal = jest.fn();
    render(
      <PopupBasketRemoveItem
        product={product}
        isRemovingModalOpen
        onRemovingModalClose={mockCloseModal}
      />
    );

    const closeButton = screen.getByLabelText('Закрыть попап');
    fireEvent.click(closeButton);

    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });
});
