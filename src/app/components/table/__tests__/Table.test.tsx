import { fireEvent, render, screen } from '@testing-library/react';
import { TableTypes } from '../../../../types/types';
import { IProductCategory } from '../../../features/category/types';
import { IShipping } from '../../../features/shipping/types';
import Table from '../Table';


const categoriesListMock: IProductCategory[] = [
  {
    main: {
      title: 'Main Category Name',
      url: 'main-category-title'
    },
    subCategories: [
      {
        title: 'Sub-category name',
        image: 'https://www.storage.com/categories/category_1.png',
        url: 'sub-category-name'
      },
    ],
  },
];

const shippingListMock: IShipping[] = [
  {
    _id: 'shipping_id_1',
    company: 'Test Company',
    country: 'Test Country',
    cities: ['Test City 1', 'Test City 2', 'Test City 3'],
    price: 100
  }
];

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
  test('should render the loader while the passed data is empty', () => {
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