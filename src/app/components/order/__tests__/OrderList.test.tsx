import { render, screen } from '@testing-library/react';
import { renderWithProviders } from '../../../../utils/testUtils';
import { IOrder } from '../../../features/order/types';
import OrderList from '../OrderList';


const ordersMock = [
  {
    _id: 'order_id_1',
    products: [
      {
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
    amount: 1,
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
    shippingCity: 'London',
    shippingCompany: 'DHL',
    paymentMethod: 'card',
    creditCardNumber: '',
    createdAt: new Date().toDateString()
  }
];

const ordersEmptyListMock: IOrder[] = [];

describe('Tests for the OrderList component', () => {
  test('should render passed order list', () => {
    renderWithProviders(<OrderList orders={ordersMock} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
  });

  test('should render the empty list message after passing an empty orders list', () => {
    renderWithProviders(<OrderList orders={ordersEmptyListMock} />);
    expect(screen.getByText('noOrdersMessage')).toBeInTheDocument();
  });
});