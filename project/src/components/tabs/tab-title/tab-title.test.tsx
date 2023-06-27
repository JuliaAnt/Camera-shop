import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TabTitle, { TabItem } from './tab-title';

describe('TabTitle component', () => {
  const tabItem: TabItem = {
    title: 'Tab 1',
    id: 'specs',
  };
  const onClick = jest.fn();
  test('should render correctly', () => {
    render(
      <BrowserRouter>
        <TabTitle
          tabItem={tabItem}
          isActive
          onClick={onClick}
        />
      </BrowserRouter>
    );

    expect(screen.getByText(tabItem.title)).toBeInTheDocument();
    expect(screen.getByTestId('tab-title')).toBeInTheDocument();
  });

  test('should "is-active" class when isActive is true', () => {
    render(
      <BrowserRouter>
        <TabTitle
          tabItem={tabItem}
          isActive
          onClick={onClick}
        />
      </BrowserRouter>
    );

    expect(screen.getByTestId('tab-button')).toHaveClass('is-active');
  });

  test('should not apply "is-active" class when isActive is false', () => {
    render(
      <BrowserRouter>
        <TabTitle
          tabItem={tabItem}
          isActive={false}
          onClick={onClick}
        />
      </BrowserRouter>
    );

    expect(screen.getByTestId('tab-button')).not.toHaveClass('is-active');
  });

  test('should calls onClick when button is clicked', () => {
    render(
      <BrowserRouter>
        <TabTitle
          tabItem={tabItem}
          isActive
          onClick={onClick}
        />
      </BrowserRouter>
    );

    const tabButton = screen.getByTestId('tab-button');
    fireEvent.click(tabButton);
    expect(onClick).toHaveBeenCalled();
  });
});
