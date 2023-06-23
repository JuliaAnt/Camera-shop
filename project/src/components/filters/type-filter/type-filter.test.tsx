import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TypeFilter from './type-filter';

describe('Component: TypeFilter', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <TypeFilter />
      </ BrowserRouter>
    );

    expect(screen.getByText('Тип камеры')).toBeInTheDocument();
    expect(screen.getByTestId('filterItem')).toBeInTheDocument();
  });
});
