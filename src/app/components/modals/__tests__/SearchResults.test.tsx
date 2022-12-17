import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchResults from '../SearchResults';


const closeHandler = jest.fn();

const productsMock = [{
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

describe('Tests for the SearchResults component', () => {
  test('should call the closeHandler after clicking on the Product link', () => {
    render(
      <MemoryRouter>
        <SearchResults 
          isOpen={true} 
          onClose={closeHandler} 
          products={productsMock} 
        />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('link', { name: 'product_id_1 Test Title' }));
    expect(closeHandler).toHaveBeenCalled();
  });
});