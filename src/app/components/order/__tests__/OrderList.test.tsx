import { screen } from '@testing-library/react';
import { ordersListMock } from '../../../../utils/testDataMocks';
import { renderWithProviders } from '../../../../utils/testUtils';
import { IOrder } from '../../../features/order/types';
import { OrderList } from '../';


const ordersEmptyListMock: IOrder[] = [];

describe('Tests for the OrderList component', () => {
  test('should render passed order list', () => {
    renderWithProviders(<OrderList orders={ordersListMock} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
  });

  test('should render the empty list message after passing an empty orders list', () => {
    renderWithProviders(<OrderList orders={ordersEmptyListMock} />);
    expect(screen.getByText('noOrdersMessage')).toBeInTheDocument();
  });
});