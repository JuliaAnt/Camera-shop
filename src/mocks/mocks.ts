import { SelectedFilter } from '../types/filters';
import { PromoProduct } from '../types/promo';
import { Review, ReviewRequest } from '../types/review';
import { SortsType } from '../types/sorts';

export const mockSelectedFilters: SelectedFilter[] = [
  {
    filterType: 'price',
    filterValue: {
      from: null,
      to: null,
    },
  },
  {
    filterType: 'level',
    filterValue: [],
  },
  {
    filterType: 'type',
    filterValue: [],
  },
  {
    filterType: 'category',
    filterValue: '',
  },
];

export const newMockSelectedFilters: SelectedFilter[] = [
  {
    filterType: 'price',
    filterValue: {
      from: null,
      to: null,
    },
  },
  {
    filterType: 'level',
    filterValue: ['Профессиональный'],
  },
  {
    filterType: 'type',
    filterValue: [],
  },
  {
    filterType: 'category',
    filterValue: '',
  },
];

export const look54Card = {
  id: 7,
  name: 'Look 54',
  vendorCode: 'NB54Y',
  type: 'Цифровая',
  category: 'Фотоаппарат',
  description: 'fakeDescription',
  previewImg: 'img/content/look-54.jpg',
  level: 'Профессиональный',
  price: 96490,
  previewImg2x: 'img/content/look-54@2x.jpg',
  previewImgWebp: 'img/content/look-54.webp',
  previewImgWebp2x: 'img/content/look-54@2x.webp',
  reviewCount: 16
};

export const mockProductCards = [
  {
    id: 6,
    name: 'Click Sap',
    vendorCode: 'KLN54H76F5',
    type: 'Плёночная',
    category: 'Фотоаппарат',
    description: 'Зеркальная камера позволяющая делать четкие фотографии. Вспышка продается и подключается отдельно. Чехол в комплекте. Плёнка 35мм',
    previewImg: 'img/content/click-sap.jpg',
    level: 'Любительский',
    price: 9490,
    previewImg2x: 'img/content/click-sap@2x.jpg',
    previewImgWebp: 'img/content/click-sap.webp',
    previewImgWebp2x: 'img/content/click-sap@2x.webp',
    reviewCount: 9
  },
  look54Card,
  {
    id: 8,
    name: 'Look SF3',
    vendorCode: 'NBSF3',
    type: 'Коллекционная',
    category: 'Видеокамера',
    description: 'Идеальная камера для старта в репортажной фотографии. оснащена встроенным стабилизатором и вспышкой. Оптический 15 кратный зум и удобная посадка в руке. ',
    previewImg: 'img/content/look-sf3.jpg',
    level: 'Любительский',
    price: 63800,
    previewImg2x: 'img/content/look-sf3@2x.jpg',
    previewImgWebp: 'img/content/look-sf3.webp',
    previewImgWebp2x: 'img/content/look-sf3@2x.webp',
    reviewCount: 5
  },
];

export const mockSelectedSorts: SortsType = { sortType: 'sortPrice', sortOrder: 'down' };

export const mockPromoProduct: PromoProduct = {
  id: 7,
  name: 'Look 54',
  previewImg: 'img/content/look-54.jpg',
  previewImg2x: 'img/content/look-54@2x.jpg',
  previewImgWebp: 'img/content/look-54.webp',
  previewImgWebp2x: 'img/content/look-54@2x.webp',
};

export const mockReviews: Review[] = [
  {
    id: 'f1d10ddd-2a21-4f71-9e1e-5f511703fbdd',
    createAt: '2022-07-09T13:24:57.980Z',
    cameraId: 1,
    userName: 'Кирилл',
    advantage: 'Легкая в плане веса, удобная в интерфейсе',
    disadvantage: 'Быстро садиться зарядка',
    review: 'Это моя первая камера. Я в восторге, нареканий нет',
    rating: 5,
  },
  {
    id: 'f1d10ddd-2a21-4f71-9e1e-5f511703fbbb',
    createAt: '2022-07-15T13:24:57.980Z',
    cameraId: 1,
    userName: 'Пётр Матросов',
    advantage: 'Хорошее пресс-папье',
    disadvantage: 'Через 3 дня развалилась на куски',
    review: 'При попытке вставить плёнку сломался механизм открытия отсека, пришлось заклеить его изолентой.',
    rating: 1,
  },
  {
    id: 'f1d10ddd-2a21-4f71-9e1e-5f511703fbaa',
    createAt: '2022-07-08T13:24:57.980Z',
    cameraId: 1,
    userName: 'Сергей Горский',
    advantage: 'Надёжная, хорошо лежит в руке, необычно выглядит',
    disadvantage: 'Тяжеловата, сложно найти плёнку',
    review: 'Раз в полгода достаю из-под стекла, стираю пыль, заряжаю — работает как часы.',
    rating: 5,
  },
];

export const mockReview: ReviewRequest = {
  cameraId: 1,
  userName: 'Кирилл',
  advantage: 'Легкая в плане веса, удобная в интерфейсе',
  disadvantage: 'Быстро садиться зарядка',
  review: 'Это моя первая камера. Я в восторге, нареканий нет',
  rating: 5,
};

export const mockAllReviews: Record<number, Review[]> = {
  6: [],
  7: [{
    id: 'f1d10ddd-2a21-4f71-9e1e-5f511703fbgg',
    createAt: '2022-07-09T13:24:57.980Z',
    cameraId: 7,
    userName: 'Кирилл',
    advantage: 'Легкая в плане веса, удобная в интерфейсе',
    disadvantage: 'Быстро садиться зарядка',
    review: 'Это моя первая камера. Я в восторге, нареканий нет',
    rating: 5,
  },
  {
    id: '7875a537-1aa6-4856-8e06-34cad32a3079',
    createAt: '2022-07-08T13:24:57.980Z',
    cameraId: 7,
    userName: 'Сергей Горский',
    advantage: 'Надёжная, хорошо лежит в руке, необычно выглядит',
    disadvantage: 'Тяжеловата, сложно найти плёнку',
    review: 'Раз в полгода достаю из-под стекла, стираю пыль, заряжаю — работает как часы.',
    rating: 5,
  },
  ],
};
