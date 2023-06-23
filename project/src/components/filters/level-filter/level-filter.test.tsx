import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LevelFilter from './level-filter';

describe('Component: LevelFilter', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <LevelFilter />
      </ BrowserRouter>
    );

    expect(screen.getByText('Уровень')).toBeInTheDocument();
    expect(screen.getByTestId('filterItem')).toBeInTheDocument();
  });
});
