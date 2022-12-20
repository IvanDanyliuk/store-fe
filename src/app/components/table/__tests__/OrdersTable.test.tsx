import { screen } from '@testing-library/react';
import { ordersListMock } from '../../../../utils/testDataMocks';
import { renderWithProviders } from '../../../../utils/testUtils';
import { IOrder } from '../../../features/order/types';
import OrdersTable from '../OrdersTable';


const emptyOrderListMock: IOrder[] = [];

describe('Tests for the OrdersTable component', () => {
  test('should render passed order list', () => {
    renderWithProviders(<OrdersTable orders={ordersListMock} />);
    expect(screen.getAllByRole('row')).toHaveLength(ordersListMock.length + 1);
  });

  test('should render an empty order list message', () => {
    renderWithProviders(<OrdersTable orders={emptyOrderListMock} />);
    expect(screen.getByText('noOrdersMessage')).toBeInTheDocument();
  });
});