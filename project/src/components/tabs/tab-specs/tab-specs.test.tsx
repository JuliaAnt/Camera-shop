import { render, screen } from '@testing-library/react';
import TabSpecs from './tab-specs';

describe('TabSpecs component', () => {
  test('should render vendor code when provided', () => {
    const vendorCode = 'ABC123';
    const type = 'Type';
    const category = 'Category';
    const level = 'Level';

    render(
      <TabSpecs
        vendorCode={vendorCode}
        type={type}
        category={category}
        level={level}
      />
    );

    expect(screen.getByText(vendorCode)).toBeInTheDocument();
  });

  test('should render category as "Фотокамера" when category is "Фотоаппарат"', () => {
    const vendorCode = 'ABC123';
    const type = 'Type';
    const category = 'Фотоаппарат';
    const level = 'Level';

    render(
      <TabSpecs
        vendorCode={vendorCode}
        type={type}
        category={category}
        level={level}
      />
    );

    expect(screen.getByText('Фотокамера')).toBeInTheDocument();
  });

  test('should render type when provided', () => {
    const vendorCode = 'ABC123';
    const type = 'Type';
    const category = 'Category';
    const level = 'Level';

    render(
      <TabSpecs
        vendorCode={vendorCode}
        type={type}
        category={category}
        level={level}
      />
    );

    expect(screen.getByText(type)).toBeInTheDocument();
  });

  test('should render empty type when not provided', () => {
    const vendorCode = 'ABC123';
    const type = undefined;
    const category = 'Category';
    const level = 'Level';

    render(
      <TabSpecs
        vendorCode={vendorCode}
        type={type}
        category={category}
        level={level}
      />
    );

    expect(screen.getByTestId('tab-specs-type')).toHaveTextContent('');
  });

  test('should render level when provided', () => {
    const vendorCode = 'ABC123';
    const type = 'Type';
    const category = 'Category';
    const level = 'Level';

    render(
      <TabSpecs
        vendorCode={vendorCode}
        type={type}
        category={category}
        level={level}
      />
    );

    expect(screen.getByText(level)).toBeInTheDocument();
  });

  test('should render empty level when not provided', () => {
    const vendorCode = 'ABC123';
    const type = 'Type';
    const category = 'Category';
    const level = undefined;

    render(
      <TabSpecs
        vendorCode={vendorCode}
        type={type}
        category={category}
        level={level}
      />
    );

    expect(screen.getByTestId('tab-specs-level')).toHaveTextContent('');
  });
});
