export type CameraCategory = 'Фотокамера' | 'Видеокамера';

export type CameraType = 'Цифровая' | 'Плёночная' | 'Моментальная' | 'Коллекционная';

export type CameraLevel = 'Нулевой' | 'Любительский' | 'Профессиональный';

export type FilterType = 'category' | 'level' | 'price' | 'type';

export type PriceFilterState = {
  filterType: 'price';
  filterValue: {
    from: number | null;
    to: number | null;
  };
}

export type SelectedFilter = {
  filterType: 'level' | 'type';
  filterValue: string[];
} | PriceFilterState | {
  filterType: 'category';
  filterValue: string;
}
