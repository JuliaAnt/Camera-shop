import { render, screen } from '@testing-library/react';
import Sort from './sort';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace } from '../../consts';

const mockStore = configureMockStore();

describe('Sort component', () => {
  test('should change sorts on radio button click', () => {
    render(
      <Provider store={mockStore({
        [NameSpace.CatalogData]: {
          sorts: {
            sortType: 'sortPopular',
            sortOrder: 'up',
          },
        }
      })}
      >
        <Sort />
      </Provider >
    );

    expect(screen.getByTestId('sortPrice')).toBeInTheDocument();
    expect(screen.getByTestId('sortPopular')).toBeInTheDocument();
    expect(screen.getByLabelText('По возрастанию')).toBeInTheDocument();
    expect(screen.getByLabelText('По убыванию')).toBeInTheDocument();
  });
});
