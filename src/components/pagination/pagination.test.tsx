import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Pagination from './pagination';

describe('Component: Pagination', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <Pagination
          totalPageCount={3}
          nextPage={jest.fn()}
          prevPage={jest.fn()}
          setPage={jest.fn()}
          page={1}
        />
      </BrowserRouter>
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Далее')).toBeInTheDocument();
  });
});
