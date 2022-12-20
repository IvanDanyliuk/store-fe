import { fireEvent, render, screen } from '@testing-library/react';
import { TableTypes } from '../../../../types/types';
import { categoriesListMock, shippingListMock } from '../../../../utils/testDataMocks';
import { IProductCategory } from '../../../features/category/types';
import { IShipping } from '../../../features/shipping/types';
import Table from '../Table';


const emptyCategoriesListMock: IProductCategory[] = [];
const emptyShippingListMock: IShipping[] = [];

const editHandler = jest.fn();
const deleteHandler = jest.fn();


describe('Tests for the Table component: categories data', () => {
  beforeEach(() => {
    render(
      <Table 
        data={categoriesListMock} 
        tableType={TableTypes.Categories} 
        status='succeeded' 
        onEdit={editHandler} 
        onDelete={deleteHandler}
      />
    );
  });

  test('should render passed categories data with the status value succeeded', () => {
    expect(screen.getAllByRole('row')).toHaveLength(categoriesListMock.length + 1);
  });

  test('should call the editHandler function after clicking on the Edit button', () => {
    fireEvent.click(screen.getByRole('button', { name: 'tableEditBtn' }));
    expect(editHandler).toHaveBeenCalled();
  });

  test('should call the deleteHandler function after clicking on the Delete button', () => {
    fireEvent.click(screen.getByRole('button', { name: 'tableDeleteBtn' }));
    expect(deleteHandler).toHaveBeenCalled();
  });
});


describe('Tests for the Table component: shipping data', () => {
  beforeEach(() => {
    render(
      <Table 
        data={shippingListMock} 
        tableType={TableTypes.Shipping} 
        status='succeeded' 
        onEdit={editHandler} 
        onDelete={deleteHandler}
      />
    );
  });

  test('should render passed shipping data with the status value succeeded', () => {
    expect(screen.getAllByRole('row')).toHaveLength(shippingListMock.length + 1);
  });

  test('should call the editHandler function after clicking on the Edit button', () => {
    fireEvent.click(screen.getByRole('button', { name: 'tableEditBtn' }));
    expect(editHandler).toHaveBeenCalled();
  });

  test('should call the deleteHandler function after clicking on the Delete button', () => {
    fireEvent.click(screen.getByRole('button', { name: 'tableDeleteBtn' }));
    expect(deleteHandler).toHaveBeenCalled();
  });
});


describe('Tests for the Table component: no data cases', () => {
  test('should render the loader while the status value is loading', () => {
    render(
      <Table 
        data={categoriesListMock} 
        tableType={TableTypes.Categories} 
        status='loading' 
        onEdit={editHandler} 
        onDelete={deleteHandler}
      />
    );
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('should show the empty categories list message while the categories list is empty', () => {
    render(
      <Table 
        data={emptyCategoriesListMock} 
        tableType={TableTypes.Categories} 
        status='succeeded' 
        onEdit={editHandler} 
        onDelete={deleteHandler}
      />
    );
    expect(screen.getByText('tableNoCategoriesMessage')).toBeInTheDocument();
  });
  
  test('should show the empty shipping list message while the shipping list is empty', () => {
    render(
      <Table 
        data={emptyShippingListMock} 
        tableType={TableTypes.Shipping} 
        status='succeeded' 
        onEdit={editHandler} 
        onDelete={deleteHandler}
      />
    );
    expect(screen.getByText('tableNoShippingMessage')).toBeInTheDocument();
  });
});