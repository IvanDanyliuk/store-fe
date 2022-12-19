import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../../utils/testUtils';
import { IOrder } from '../../../features/order/types';
import OrdersTable from '../OrdersTable';


const orderListMock: IOrder[] = [
  {
    _id: 'order_id_1',
    products: [
      {
        _id: '',
        product: {
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
        },
        quantity: 1
      }
    ],
    amount: 1000,
    customer: {
      firstName: 'John',
      lastName: 'Doe',
      phone: '777 777 77 77',
      email: 'test@test.com'
    },
    recepient: {
      firstName: 'John',
      lastName: 'Doe',
      phone: '777 777 77 77',
      email: 'test@test.com'
    },
    isPaid: false,
    isShipped: false,
    paymentMethod: 'card',
    creditCardNumber: '',
    shippingCity: 'London',
    shippingCompany: 'DHL',
    createdAt: new Date().toDateString(),
  }
];

const emptyOrderListMock: IOrder[] = [];

describe('Tests for the OrdersTable component', () => {
  test('should render passed order list', () => {
    renderWithProviders(<OrdersTable orders={orderListMock} />);
    expect(screen.getAllByRole('row')).toHaveLength(orderListMock.length + 1);
  });

  test('should render an empty order list message', () => {
    renderWithProviders(<OrdersTable orders={emptyOrderListMock} />);
    expect(screen.getByText('noOrdersMessage')).toBeInTheDocument();
  });
});