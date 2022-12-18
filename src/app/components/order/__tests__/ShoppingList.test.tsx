import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders, renderWithProvidersForUpdation } from '../../../../utils/testUtils';
import { ICartItem } from '../../../features/cart/types';
import ShoppingList from '../ShoppingList';


const cartDataMock = [
  {
    _id: 'cart_item_id_1',
    quantity: 1, 
    product: {
      _id: 'product_id_1',
      brand: 'Test Brand',
      category: {
        main: {
          title: 'Main Category Name',
          url: 'main-category-title'
        },
        subCategory: {
          title: 'Sub-category name',
          url: 'sub-category-name'
        }
      },
      color: '#ffffff',
      description: 'Test Descrinption',
      image: 'https://www.storage.com/categories/test_product.png',
      isInStock: true,
      price: 1000,
      promotion: ['TOP'],
      rating: 5,
      shortInfo: 'Test short information',
      title: 'Test Title'
    }
  }
];

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