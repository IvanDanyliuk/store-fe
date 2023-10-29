import { fireEvent, screen } from '@testing-library/react';
import { cartDataMock } from '../../../../utils/testDataMocks';
import { renderWithProviders, renderWithProvidersForUpdation } from '../../../../utils/testUtils';
import { ICartItem } from '../../../features/cart/types';
import { ShoppingList } from '../';


const emptyCartDataMock: ICartItem[] = [];

describe('Tests for the ShoppingList component', () => {
  test('should render the ShoppingList component with existing orders', () => {
    renderWithProviders(<ShoppingList cart={cartDataMock} />);
    fireEvent.click(screen.getByTestId('increaseBtn'));
    fireEvent.click(screen.getByTestId('decreaseBtn'));
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
  });

  test('should render the ShoppingList component without existing orders', () => {
    renderWithProvidersForUpdation(<ShoppingList cart={cartDataMock} />);
    fireEvent.click(screen.getByTestId('increaseBtn'));
    fireEvent.click(screen.getByTestId('decreaseBtn'));
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
  });

  test('should delete the order from the list after clicking the Delete button with existing orders', () => {
    renderWithProviders(<ShoppingList cart={cartDataMock} />);
    fireEvent.click(screen.getByRole('button', { name: '' }));
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
  });

  test('should delete the order from the list after clicking the Delete button without existingorders', () => {
    renderWithProvidersForUpdation(<ShoppingList cart={cartDataMock} />);
    fireEvent.click(screen.getByRole('button', { name: '' }));
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
  });

  test('should show the empty cart message while the cart is empty', () => {
    renderWithProviders(<ShoppingList cart={emptyCartDataMock} />);
    expect(screen.getByText('cartEmptyMessage')).toBeInTheDocument();
  });
});