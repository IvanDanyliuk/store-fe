import { fireEvent, screen } from '@testing-library/react';
import { productFromWishListMock, productNotFromWishListMock } from '../../../../utils/testDataMocks'
import { renderWithProviders } from '../../../../utils/testUtils';
import ProductCard from '../ProductCard';


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