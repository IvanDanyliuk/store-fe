import { fireEvent, render, screen } from '@testing-library/react';
import { productsMock } from '../../../../utils/testDataMocks';
import { IProduct } from '../../../features/product/types';
import { ProductTable } from '../';


const emptyProductListMock: IProduct[] = [];

const editHandler = jest.fn();
const deleteHandler = jest.fn();

describe('Tests for the ProductTable component', () => {
  test('should render a loader while the status value is loading', () => {
    render(
      <ProductTable 
        products={productsMock} 
        status='loading' 
        onEdit={editHandler} 
        onDelete={deleteHandler} 
      />
    );
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('should render the empty product list message while the product list is empty', () => {
    render(
      <ProductTable 
        products={emptyProductListMock} 
        status='succeeded' 
        onEdit={editHandler} 
        onDelete={deleteHandler} 
      />
    );
    expect(screen.getByText('productsNoDataMessage')).toBeInTheDocument();
  });

  test('should render the product list message while the status value is succeeded', () => {
    render(
      <ProductTable 
        products={productsMock} 
        status='succeeded' 
        onEdit={editHandler} 
        onDelete={deleteHandler} 
      />
    );
    expect(screen.getByText(productsMock[0].title)).toBeInTheDocument();
  });

  test('should call the editHandler function after clicking on the Edit button', () => {
    render(
      <ProductTable 
        products={productsMock} 
        status='succeeded' 
        onEdit={editHandler} 
        onDelete={deleteHandler} 
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'editBtn' }));
    expect(editHandler).toHaveBeenCalled();
  });

  test('should call the deleteHandler function after clicking on the Delete button', () => {
    render(
      <ProductTable 
        products={productsMock} 
        status='succeeded' 
        onEdit={editHandler} 
        onDelete={deleteHandler} 
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'deleteItemBtn' }));
    fireEvent.click(screen.getByRole('button', { name: 'deleteItemYes' }));
    expect(deleteHandler).toHaveBeenCalled();
  });
});