import { fireEvent, render, screen } from '@testing-library/react';
import { IProductCategory } from '../../../features/category/types';
import { IProduct } from '../../../features/product/types';
import Pagination from '../Pagination';


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

const setPageHandler = jest.fn();

describe('Tests for the Pagination component', () => {
  test('should call the setPageHandler function after clicking on the numeration button', () => {
    render(
      <Pagination 
        range={[1]} 
        slice={productsMock} 
        page={1} 
        setPage={setPageHandler} 
      />
    );
    fireEvent.click(screen.getByRole('button', { name: '1' }));
    expect(setPageHandler).toHaveBeenCalled();
  });

  test('should call the setPageHandler function after clicking on the numeration button while the slice is empty', () => {
    render(
      <Pagination 
        range={[1]} 
        slice={[]} 
        page={2} 
        setPage={setPageHandler} 
      />
    );
    fireEvent.click(screen.getByRole('button', { name: '1' }));
    expect(setPageHandler).toHaveBeenCalled();
  });
});