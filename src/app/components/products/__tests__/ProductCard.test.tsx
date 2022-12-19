import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../../../utils/testUtils';
import ProductCard from '../ProductCard';


const productFromWishListMock = {
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
};

const productNotFromWishListMock = {
  _id: 'product_id_2',
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
    title: 'Another Test Title'
};

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};

Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe('Tests for the ProductCard component', () => {
  test('should render passed product data', () => {
    renderWithProviders(<ProductCard product={productFromWishListMock} />);
    expect(screen.getByText(productFromWishListMock.title)).toBeInTheDocument();
  });

  test('should add the product to cart after clicking the AddToCart button', () => {
    renderWithProviders(<ProductCard product={productFromWishListMock} />);
    fireEvent.click(screen.getByTestId('addToCartBtn'));
    expect(localStorageMock.setItem).toHaveBeenCalled();
  });

  test('should add the product to the wish list after clicking the AddToCart button', () => {
    renderWithProviders(<ProductCard product={productFromWishListMock} />);
    fireEvent.click(screen.getByTestId('addToWishListBtn'));
    expect(localStorageMock.setItem).toHaveBeenCalled();
  });

  test('should remove the product from the wish list after clicking the AddToCart button', () => {
    renderWithProviders(<ProductCard product={productNotFromWishListMock} />);
    fireEvent.click(screen.getByTestId('addToWishListBtn'));
    expect(localStorageMock.setItem).toHaveBeenCalled();
  });
});