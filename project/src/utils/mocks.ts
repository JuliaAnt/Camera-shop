import { SelectedFilter } from '../types/filters';

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
    filterValue: [],
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
    filterValue: [],
  },
];

export const look54Card = {
  id: 7,
  name: 'Look 54',
  vendorCode: 'NB54Y',
  type: 'Цифровая',
  category: 'Фотоаппарат',
  description: 'Профессиональный зеркальный фотоаппарат оснащен 56-кратным зумом, позволяет создавать чёткие снимки, а новейший процессор позволяет справляться с шумами и светочувствительностью.',
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


