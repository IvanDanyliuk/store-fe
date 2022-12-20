import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { productsMock } from '../../../../utils/testDataMocks';
import SearchResults from '../SearchResults';


const closeHandler = jest.fn();


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