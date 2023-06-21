export type CameraCategory = 'Фотокамера' | 'Видеокамера';

export type CameraType = 'Цифровая' | 'Плёночная' | 'Моментальная' | 'Коллекционная';

export type CameraLevel = 'Нулевой' | 'Любительский' | 'Профессиональный';

export type FilterType = 'category' | 'level' | 'price' | 'type';

export type SelectedFilter = {
  filterType: 'category' | 'level' | 'type';
  filterValue: string[];
} | {
  filterType: 'price';
  filterValue: { from: number | null; to: number | null };
}
