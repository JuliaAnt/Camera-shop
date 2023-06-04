export enum AppRoute {
  Camera = '/camera/:id',
  Catalog = '/:page_1',
  Basket = '/basket',
}

export enum NameSpace {
  CatalogData = 'CATALOG_DATA',
  ReviewData = 'REVIEW_DATA',
  Basket = 'BASKET',
}

export enum APIRoute {
  Products = '/cameras',
  SelectedQuest = '/quest/{questId}',
  PromoProduct = '/promo',
  Logout = '/logout',
  BookedQuests = '/reservation',
  Reviews = '/cameras/{cameraId}/reviews',
}

export const LEVEL_FILTER_MAP = [
  {
    name: 'zero',
    title: 'Нулевой',
  },
  {
    name: 'non-professional',
    title: 'Любительский',
  },
  {
    name: 'professional',
    title: 'Профессиональный',
  },
];

export const CATEGORY_FILTER_MAP = [
  {
    name: 'photocamera',
    title: 'Фотоаппарат',
  },
  {
    name: 'videocamera',
    title: 'Видеокамера',
  },
];

export const TYPE_FILTER_MAP = [
  {
    name: 'digital',
    title: 'Цифровая',
  },
  {
    name: 'film',
    title: 'Плёночная',
  },
  {
    name: 'snapshot',
    title: 'Моментальная',
  },
  {
    name: 'collection',
    title: 'Коллекционная',
  },
];

export const RATINGS = [1, 2, 3, 4, 5];

export const PRODUCTS_PER_PAGE = 9;
