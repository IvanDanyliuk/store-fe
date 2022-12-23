import store from '../../store';
import { 
  clearOrder, 
  clearOrderError, 
  clearClientSecret,
  clearOrderToUpdate, 
  decreaseOrderProductQuantity, 
  increaseOrderProductQuantity, 
  removeProductFromOrder, 
  setOrderToUpdate 
} from '../reducers';
import { 
  getOrders, 
  getUserOrders, 
  createOrder, 
  updateOrder, 
  deleteOrder, 
  payOrder 
} from '../asyncActions';
import { setupOrderErrorHandlers, setupOrderSuccessHandlers } from '../../../../utils/serverMocks/order';
import { orderItemMock, ordersMock, orderToUpdate } from '../../../../utils/testDataMocks';


describe('Tests for the Order reducers: success cases', () => {
  beforeEach(() => {
    setupOrderSuccessHandlers();
  });

  test('should get orders list by dispatching the getOrders action', async () => {
    let state = store.getState().order;
    await store.dispatch(getOrders({ page: 1, ordersPerPage: 10, filterData: 'Doe' }));
    state = store.getState().order;
    expect(state.orders.data[0]._id).toBe(ordersMock.data[0]._id);
  });

  test('should get orders of the specific user by dispatching the getUserOrder action', async () => {
    let state = store.getState().order;
    await store.dispatch(getUserOrders({ page: 1, ordersPerPage: 10, email: 'test@test.com' }));
    state = store.getState().order;
    expect(state.orders.data[0]._id).toBe(ordersMock.data[0]._id);
  });

  test('should add a new order item by dispatching the createOrder action', async () => {
    let state = store.getState().order;
    await store.dispatch(createOrder(orderItemMock));
    state = store.getState().order;
    expect(state.orders.data[0]._id).toBe(ordersMock.data[0]._id);
  });

  test('should update the order by dispatching the updateOrder action', async () => {
    let state = store.getState().order;
    await store.dispatch(createOrder(orderItemMock));
    state = store.getState().order;
    await store.dispatch(updateOrder(orderToUpdate));
    state = store.getState().order;
    expect(state.orders.data[0].amount).toBe(orderToUpdate.updatedOrder.amount);
  });

  test('should remove an order by dispatching the deleteOrder action', async () => {
    let state = store.getState().order;
    await store.dispatch(getOrders({ page: 1, ordersPerPage: 10 }));
    state = store.getState().order;
    await store.dispatch(deleteOrder(orderItemMock._id!));
    state = store.getState().order;
    expect(state.orders.data).toHaveLength(ordersMock.data.length - 1);
  });

  test('should clear the order field by dispatching the clearOrderToUpdate action', () => {
    let state = store.getState().order;
    state = {
      ...store.getState().order,
      order: orderItemMock
    };
    store.dispatch(clearOrderToUpdate());
    state = store.getState().order;
    expect(state.order).toBeNull();
  });

  test('should clear the data field by dispatching the clearOrder action', async () => {
    let state = store.getState().order;
    await store.dispatch(getOrders({ page: 1, ordersPerPage: 10 }));
    state = store.getState().order;
    store.dispatch(clearOrder());
    state = store.getState().order;
    expect(state.orders.data).toHaveLength(0);
  });

  test('should set the order to update by dispatching the setOrderToUpdate action', () => {
    let state = store.getState().order;
    store.dispatch(setOrderToUpdate(orderItemMock));
    state = store.getState().order;
    expect(state.order).not.toBeNull();
  });

  test('should decrease the product quantity by dispatching the decreaseProductQuantity action', async () => {
    let state = store.getState().order;
    store.dispatch(setOrderToUpdate(orderItemMock));
    state = store.getState().order;
    store.dispatch(increaseOrderProductQuantity(orderItemMock.products[0].product._id));
    state = store.getState().order;
    store.dispatch(decreaseOrderProductQuantity(orderItemMock.products[0].product._id));
    state = store.getState().order;
    expect(state.order!.products[0].quantity).toBe(orderItemMock.products[0].quantity);
  });

  test('should remove a product from the order by dispatching the removeProductFromOrder action', () => {
    let state = store.getState().order;
    store.dispatch(setOrderToUpdate(orderItemMock));
    state = store.getState().order;
    store.dispatch(removeProductFromOrder(orderItemMock.products[0]._id));
    state = store.getState().order;
    expect(state.order?.products).toHaveLength(orderItemMock.products.length - 1);
  });

  test('should get a client secret key by dispatching the payOrder action', async () => {
    let state = store.getState().order;
    await store.dispatch(payOrder(orderItemMock));
    state = store.getState().order;
    expect(state.clientSecret).toBe('client_secret_key');
  });

  test('should clear the client secret key by dispatching the clearClientSecret action', async () => {
    let state = store.getState().order;
    await store.dispatch(payOrder(orderItemMock));
    state = store.getState().order;
    store.dispatch(clearClientSecret());
    state = store.getState().order;
    expect(state.clientSecret).toBeNull();
  });
});


describe('Tests for the Order reducers: error cases', () => {
  beforeEach(() => {
    setupOrderErrorHandlers();
  });

  test('should get orders list by dispatching the getOrders action', async () => {
    let state = store.getState().order;
    await store.dispatch(getOrders({ page: 1, ordersPerPage: 10, filterData: 'Doe' }));
    state = store.getState().order;
    expect(state.error).toBe('alertGetOrdersMessage');
  });

  test('should get orders of the specific user by dispatching the getUserOrder action', async () => {
    let state = store.getState().order;
    await store.dispatch(getUserOrders({ page: 1, ordersPerPage: 10, email: 'test@test.com' }));
    state = store.getState().order;
    expect(state.error).toBe('alertGetOrdersMessage');
  });

  test('should add a new order item by dispatching the createOrder action', async () => {
    let state = store.getState().order;
    await store.dispatch(createOrder(orderItemMock));
    state = store.getState().order;
    expect(state.error).toBe('alertCreateOrderMessage');
  });

  test('should update the order by dispatching the updateOrder action', async () => {
    let state = store.getState().order;
    await store.dispatch(getOrders({ page: 1, ordersPerPage: 10, filterData: 'Doe' }));
    state = store.getState().order;
    await store.dispatch(updateOrder(orderToUpdate));
    state = store.getState().order;
    expect(state.error).toBe('alertUpdateOrderMessage');
  });

  test('should remove an order by dispatching the deleteOrder action', async () => {
    let state = store.getState().order;
    await store.dispatch(getOrders({ page: 1, ordersPerPage: 10 }));
    state = store.getState().order;
    await store.dispatch(deleteOrder(orderItemMock._id!));
    state = store.getState().order;
    expect(state.error).toBe('alertDeleteOrderMessage');
  });

  test('should clear the order error value by dispatching the clearOrderError action', async () => {
    let state = store.getState().order;
    await store.dispatch(getOrders({ page: 1, ordersPerPage: 10, filterData: 'Doe' }));
    state = store.getState().order;
    store.dispatch(clearOrderError());
    state = store.getState().order;
    expect(state.error).toBeNull();
  });

  test('should get an error message by dispatching the payOrder action', async () => {
    let state = store.getState().order;
    await store.dispatch(payOrder(orderItemMock));
    state = store.getState().order;
    expect(state.error).toBe('alertOrderPaymentMessage');
  });
});