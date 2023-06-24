import { render, screen } from '@testing-library/react';
import TabSpecs from './tab-specs';

describe('TabSpecs component', () => {
  test('should render vendor code when provided', () => {
    const vendorCode = 'ABC123';
    const type = 'Type';
    const category = 'Category';
    const level = 'Level';
    const id = 1;
    const selectedTabIndex = 1;

    render(
      <TabSpecs
        vendorCode={vendorCode}
        type={type}
        category={category}
        level={level}
        id={id}
        selectedTabIndex={selectedTabIndex}
      />
    );

    expect(screen.getByText(vendorCode)).toBeInTheDocument();
  });

  test('should render category as "Фотокамера" when category is "Фотоаппарат"', () => {
    const vendorCode = 'ABC123';
    const type = 'Type';
    const category = 'Фотоаппарат';
    const level = 'Level';
    const id = 1;
    const selectedTabIndex = 1;

    render(
      <TabSpecs
        vendorCode={vendorCode}
        type={type}
        category={category}
        level={level}
        id={id}
        selectedTabIndex={selectedTabIndex}
      />
    );

    expect(screen.getByText('Фотокамера')).toBeInTheDocument();
  });

  test('should render type when provided', () => {
    const vendorCode = 'ABC123';
    const type = 'Type';
    const category = 'Category';
    const level = 'Level';
    const id = 1;
    const selectedTabIndex = 1;

    render(
      <TabSpecs
        vendorCode={vendorCode}
        type={type}
        category={category}
        level={level}
        id={id}
        selectedTabIndex={selectedTabIndex}
      />
    );

    expect(screen.getByText(type)).toBeInTheDocument();
  });

  test('should render empty type when not provided', () => {
    const vendorCode = 'ABC123';
    const type = undefined;
    const category = 'Category';
    const level = 'Level';
    const id = 1;
    const selectedTabIndex = 1;

    render(
      <TabSpecs
        vendorCode={vendorCode}
        type={type}
        category={category}
        level={level}
        id={id}
        selectedTabIndex={selectedTabIndex}
      />
    );

    expect(screen.getByTestId('tab-specs-type')).toHaveTextContent('');
  });

  test('should render level when provided', () => {
    const vendorCode = 'ABC123';
    const type = 'Type';
    const category = 'Category';
    const level = 'Level';
    const id = 1;
    const selectedTabIndex = 1;

    render(
      <TabSpecs
        vendorCode={vendorCode}
        type={type}
        category={category}
        level={level}
        id={id}
        selectedTabIndex={selectedTabIndex}
      />
    );

    expect(screen.getByText(level)).toBeInTheDocument();
  });

  test('should render empty level when not provided', () => {
    const vendorCode = 'ABC123';
    const type = 'Type';
    const category = 'Category';
    const level = undefined;
    const id = 1;
    const selectedTabIndex = 1;

    render(
      <TabSpecs
        vendorCode={vendorCode}
        type={type}
        category={category}
        level={level}
        id={id}
        selectedTabIndex={selectedTabIndex}
      />
    );

    expect(screen.getByTestId('tab-specs-level')).toHaveTextContent('');
  });

  test('should apply active class when selectedTabIndex matches id', () => {
    const vendorCode = 'ABC123';
    const type = 'Type';
    const category = 'Category';
    const level = 'Level';
    const id = 1;
    const selectedTabIndex = 1;

    render(
      <TabSpecs
        vendorCode={vendorCode}
        type={type}
        category={category}
        level={level}
        id={id}
        selectedTabIndex={selectedTabIndex}
      />
    );

    expect(screen.getByTestId('tab-specs')).toBeInTheDocument();
  });

  test('should not apply active class when selectedTabIndex does not match id', () => {
    const vendorCode = 'ABC123';
    const type = 'Type';
    const category = 'Category';
    const level = 'Level';
    const id = 1;
    const selectedTabIndex = 2;

    render(
      <TabSpecs
        vendorCode={vendorCode}
        type={type}
        category={category}
        level={level}
        id={id}
        selectedTabIndex={selectedTabIndex}
      />
    );

    expect(screen.getByTestId('tab-specs')).not.toHaveClass('is-active');
  });
});
