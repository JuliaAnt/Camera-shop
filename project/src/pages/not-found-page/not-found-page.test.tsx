import React from 'react';
import NotFoundPage from './not-found-page';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

describe('Component: NotFoundPage', () => {
  it('should render correctly', () => {
    render(
      <React.StrictMode>
        <BrowserRouter>
          <NotFoundPage />
        </ BrowserRouter>
      </ React.StrictMode>
    );

    const headerElement = screen.getByText('404 - page not found');
    const linkElement = screen.getByText('Перейти на главную страницу');

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
