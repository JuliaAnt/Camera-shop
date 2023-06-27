import { render, screen } from '@testing-library/react';
import TabDescription from './tab-description';

describe('TabDescription component', () => {
  test('should render description when provided', () => {
    const description = 'fakeDescription';

    render(
      <TabDescription description={description} />
    );

    const descriptionElement = screen.getByText(description);
    expect(descriptionElement).toBeInTheDocument();
  });

  test('should render empty description when not provided', () => {
    const description = undefined;

    render(
      <TabDescription description={description} />
    );

    expect(screen.getByTestId('tab-description').innerHTML).toMatch('');
  });

  test('should apply active class when selectedTabIndex matches id', () => {
    const description = 'fakeDescription';

    render(
      <TabDescription description={description} />
    );

    expect(screen.getByTestId('tab-description')).toBeInTheDocument();
  });

  test('should not apply active class when selectedTabIndex does not match id', () => {
    const description = 'fakeDescription';

    render(
      <TabDescription description={description} />
    );

    expect(screen.queryByText('fakeDescription')).not.toHaveClass('is-active');
  });
});
