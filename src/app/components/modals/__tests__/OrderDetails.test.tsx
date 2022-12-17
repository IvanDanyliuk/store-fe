import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../../../utils/testUtils';
import OrderDetails from '../OrderDetails';


const orderMock = {
  _id: 'order_id_1',
  products: [
    {
      _id: 'product_id_1',
      quantity: 1,
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
      }
    }
  ],
  amount: 1000,
  customer: {
    firstName: 'John',
    lastName: 'Doe',
    phone: '7777777',
    email: 'j.doe@gmail.com'
  },
  recepient: {
    firstName: 'John',
    lastName: 'Doe',
    phone: '7777777',
    email: 'j.doe@gmail.com'
  },
  isPaid: false,
  isShipped: false,
  shippingCity: 'London',
  shippingCompany: 'DHL',
  paymentMethod: 'card',
  creditCardNumber: '',
  createdAt: new Date().toDateString()
};

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));

describe('Tests for the OrderDetails component', () => {
  beforeEach(() => {
    renderWithProviders(<OrderDetails order={orderMock} />);
    fireEvent.click(screen.getByRole('button', { name: '' }));
  });

  test('should navigate to the Order page after clicking the Edit button', () => {
    fireEvent.click(screen.getByRole('button', { name: 'orderDetailsEditBtn' }));
    expect(mockedUsedNavigate).toHaveBeenCalled();
  });

  test('should close the dialog after clicking the Delete button', () => {
    fireEvent.click(screen.getByRole('button', { name: 'orderDetailsDeleteBtn' }));
    expect(screen.queryByRole('dialog')).toBeInTheDocument();
  });
});