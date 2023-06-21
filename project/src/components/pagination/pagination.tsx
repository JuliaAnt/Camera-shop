import { ProductCard } from '../../types/product-card';

type PaginationProps = {
  products: ProductCard[];
  totalPageCount: number;
  nextPage: () => void;
  prevPage: () => void;
  setPage: (page: number) => void;
  page: number;
}

function Pagination({ products, totalPageCount, nextPage, prevPage, setPage, page }: PaginationProps): JSX.Element {
  // eslint-disable-next-line no-console
  console.log(page);

  return (
    <ul className="pagination__list" data-testid={'pagination'}>
      <li className='pagination__item' style={{ visibility: `${page === 1 ? 'hidden' : 'visible'}` }}>
        <a
          className="pagination__link pagination__link--text"
          href={`?page_${page - 1}`}
          // href='#'
          onClick={prevPage}
        >Назад
        </a>
      </li>
      {
        [...Array(totalPageCount).keys()].map((pageNumber) => (
          <li key={pageNumber + 1} className="pagination__item">
            <a
              className={`pagination__link${page === pageNumber + 1 ? ' pagination__link--active' : ''}`}
              href={`?page_${pageNumber + 1}`}
              // href='#'
              onClick={() => setPage(pageNumber + 1)}
            >{pageNumber + 1}
            </a>
          </li>
        ))
      }
      <li className="pagination__item" style={{ visibility: `${page === totalPageCount ? 'hidden' : 'visible'}` }}>
        <a
          className="pagination__link pagination__link--text"
          href={`?page_${page + 1}`}
          // href='#'
          onClick={nextPage}
        >Далее
        </a>
      </li>
    </ul >
  );
}

export default Pagination;
