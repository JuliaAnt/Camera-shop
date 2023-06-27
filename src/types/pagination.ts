export type UsePaginationReturn = {
  totalPageCount: number;
  nextPage: () => void;
  prevPage: () => void;
  setPage: (page: number) => void;
  firstProductIndex: number;
  lastProductIndex: number;
  page: number;
}
