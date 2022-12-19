import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../../utils/testUtils';
import { IProduct } from '../../../features/product/types';
import ProductList from '../ProductList';


const categoryMock = 'main-category-title';

const productsMock: IProduct[] = [{
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
}];

const emptyProductsListMock: IProduct[] = [];


describe('Tests for the ProductList component', () => {
  test('should render passed products', () => {
    renderWithProviders(
      <ProductList 
        category={categoryMock} 
        products={productsMock} 
      />
    );
    expect(screen.getAllByRole('listitem')).toHaveLength(1);;
  });

  test('should render the error message after passing an empty product list', () => {
    renderWithProviders(
      <ProductList 
        category={categoryMock} 
        products={emptyProductsListMock} 
      />
    );
    expect(screen.getByText('errorMessage')).toBeInTheDocument();
  });
});