import { render, fireEvent, screen } from '@testing-library/react';
import Tabs from './tabs';
import { BrowserRouter } from 'react-router-dom';

describe('Tabs component', () => {
  test('should render tab titles', () => {
    const vendorCode = 'ABC123';
    const type = 'Type A';
    const category = 'Category A';
    const description = 'fakeDescription';
    const level = 'Level A';

    render(
      <BrowserRouter>
        <Tabs
          vendorCode={vendorCode}
          type={type}
          category={category}
          description={description}
          level={level}
        />
      </BrowserRouter>
    );

    const tabTitle1 = screen.getByText('Характеристики');
    const tabTitle2 = screen.getByText('Описание');

    expect(tabTitle1).toBeInTheDocument();
    expect(tabTitle2).toBeInTheDocument();
  });

  test('should render initial tab content', () => {
    const vendorCode = 'ABC123';
    const type = 'Type A';
    const category = 'Category A';
    const description = 'fakeDescription';
    const level = 'Level A';

    render(
      <BrowserRouter>
        <Tabs
          vendorCode={vendorCode}
          type={type}
          category={category}
          description={description}
          level={level}
        />
      </BrowserRouter>
    );

    const tabDescription = screen.getByText(description);

    expect(tabDescription).toBeInTheDocument();
    expect(screen.queryByTestId('tab-specs')).not.toBeInTheDocument();
  });

  test('should switch tab content on tab title click', () => {
    const vendorCode = 'ABC123';
    const type = 'Type A';
    const category = 'Category A';
    const description = 'fakeDescription';
    const level = 'Level A';

    render(
      <BrowserRouter>
        <Tabs
          vendorCode={vendorCode}
          type={type}
          category={category}
          description={description}
          level={level}
        />
      </BrowserRouter>
    );

    const tabTitle1 = screen.getByText('Характеристики');
    const tabTitle2 = screen.getByText('Описание');

    expect(screen.getByTestId('tab-description')).toBeInTheDocument();
    expect(screen.queryByTestId('tab-specs')).not.toBeInTheDocument();

    fireEvent.click(tabTitle1);
    expect(screen.getByTestId('tab-specs')).toBeInTheDocument();
    expect(screen.queryByTestId('tab-description')).not.toBeInTheDocument();

    fireEvent.click(tabTitle2);
    expect(screen.getByTestId('tab-description')).toBeInTheDocument();
    expect(screen.queryByTestId('tab-specs')).not.toBeInTheDocument();
  });
});
