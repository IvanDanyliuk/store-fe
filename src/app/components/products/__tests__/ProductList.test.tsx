import { screen } from '@testing-library/react';
import { productsMock } from '../../../../utils/testDataMocks';
import { renderWithProviders } from '../../../../utils/testUtils';
import { IProduct } from '../../../features/product/types';
import ProductList from '../ProductList';


const categoryMock = 'main-category-title';
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