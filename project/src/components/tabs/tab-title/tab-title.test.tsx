import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TabTitle from './tab-title';

describe('TabTitle component', () => {
  test('should render title', () => {
    const title = 'Tab 1';
    const id = 1;
    const selectedTabIndex = 1;
    const onClick = jest.fn();

    render(
      <BrowserRouter>
        <TabTitle
          title={title}
          id={id}
          selectedTabIndex={selectedTabIndex}
          onClick={onClick}
        />
      </BrowserRouter>
    );

    expect(screen.getByText(title)).toBeInTheDocument();
  });

  test('should apply active class when selectedTabIndex matches id', () => {
    const title = 'Tab 1';
    const id = 1;
    const selectedTabIndex = 1;
    const onClick = jest.fn();

    render(
      <BrowserRouter>
        <TabTitle
          title={title}
          id={id}
          selectedTabIndex={selectedTabIndex}
          onClick={onClick}
        />
      </BrowserRouter>
    );

    expect(screen.getByTestId('tab-title')).toBeInTheDocument();
  });

  test('should not apply active class when selectedTabIndex does not match id', () => {
    const title = 'Tab 1';
    const id = 1;
    const selectedTabIndex = 2;
    const onClick = jest.fn();

    render(
      <BrowserRouter>
        <TabTitle
          title={title}
          id={id}
          selectedTabIndex={selectedTabIndex}
          onClick={onClick}
        />
      </BrowserRouter>
    );

    expect(screen.getByTestId('tab-title')).not.toHaveClass('is-active');
  });

  test('should call onClick with correct tabIndex when clicked', () => {
    const title = 'Tab 1';
    const id = 1;
    const selectedTabIndex = 1;
    const onClick = jest.fn();

    render(
      <BrowserRouter>
        <TabTitle
          title={title}
          id={id}
          selectedTabIndex={selectedTabIndex}
          onClick={onClick}
        />
      </BrowserRouter>
    );

    const tabElement = screen.getByText(title);
    fireEvent.click(tabElement);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(id);
  });
});
