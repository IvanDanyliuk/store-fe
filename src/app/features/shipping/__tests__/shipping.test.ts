import store from '../../store';
import { getShipping, clearShipping, clearShippingError } from '../reducers';
import { getShippings, createShipping, updateShipping, deleteShipping } from '../asyncActions';
import { setupShippingErrorHandlers, setupShippingSuccessHandlers } from '../../../../utils/serverMocks/shipping';
import { shippingItemMock, shippingsMock, shippingToUpdateMock } from '../../../../utils/testDataMocks';


describe('Tests for the Shipping reducers: success cases', () => {
  beforeEach(() => {
    setupShippingSuccessHandlers();
  });

  test('should get shipping data by dispatching the getShipping action', async () => {
    let state = store.getState().shipping;
    await store.dispatch(getShippings());
    state = store.getState().shipping;
    expect(state.shippings).toHaveLength(shippingsMock.length);
  });

  test('should create a new shipping item by dispatching the createShipping action', async () => {
    let state = store.getState().shipping;
    await store.dispatch(createShipping(shippingItemMock));
    state = store.getState().shipping;
    expect(state.shippings).toHaveLength(shippingsMock.length + 1);
  });

  test('should update a shipping item by dispatching the updateShipping action', async () => {
    let state = store.getState().shipping;
    store.dispatch(getShipping(shippingToUpdateMock.id));
    state = store.getState().shipping;
    await store.dispatch(updateShipping(shippingToUpdateMock));
    state = store.getState().shipping;
    expect(state.shippings[0].company).toBe(shippingToUpdateMock.updatedShipping.company);
  });

  test('should remove the shipping item by dispatching the deleteShipping action', async () => {
    let state = store.getState().shipping;
    await store.dispatch(getShippings());
    state = store.getState().shipping;
    await store.dispatch(deleteShipping(shippingToUpdateMock.id));
    state = store.getState().shipping;
    expect(state.shippings).toHaveLength(shippingsMock.length - 1);
  });

  test('should get the shipping item by dispatching the getShipping action', async () => {
    let state = store.getState().shipping;
    await store.dispatch(getShippings());
    state = store.getState().shipping;
    store.dispatch(getShipping(shippingToUpdateMock.id));
    state = store.getState().shipping;
    expect(state.shipping).not.toBeNull();
  });

  test('should clear the shipping field at the state by dispatch the clearShipping action', async () => {
    let state = store.getState().shipping;
    await store.dispatch(getShippings());
    state = store.getState().shipping;
    store.dispatch(getShipping(shippingToUpdateMock.id));
    state = store.getState().shipping;
    store.dispatch(clearShipping());
    state = store.getState().shipping;
    expect(state.shipping).toBeNull();
  });
});


describe('Tests for the Shipping reducers: error cases', () => {
  beforeEach(() => {
    setupShippingErrorHandlers();
  });

  test('should get shipping data by dispatching the getShipping action', async () => {
    let state = store.getState().shipping;
    await store.dispatch(getShippings());
    state = store.getState().shipping;
    expect(state.error).toBe('alertGetShippingsMessage');
  });

  test('should create a new shipping item by dispatching the createShipping action', async () => {
    let state = store.getState().shipping;
    await store.dispatch(createShipping(shippingItemMock));
    state = store.getState().shipping;
    expect(state.error).toBe('alertCreateShippingMessage');
  });

  test('should update a shipping item by dispatching the updateShipping action', async () => {
    let state = store.getState().shipping;
    store.dispatch(getShipping(shippingToUpdateMock.id));
    state = store.getState().shipping;
    await store.dispatch(updateShipping(shippingToUpdateMock));
    state = store.getState().shipping;
    expect(state.error).toBe('alertUpdateShippingMessage');
  });

  test('should remove the shipping item by dispatching the deleteShipping action', async () => {
    let state = store.getState().shipping;
    await store.dispatch(getShippings());
    state = store.getState().shipping;
    await store.dispatch(deleteShipping(shippingToUpdateMock.id));
    state = store.getState().shipping;
    expect(state.error).toBe('alertDeleteShippingMessage');
  });

  test('should set the error value as null by dispatching the clearShippingError action', async () => {
    let state = store.getState().shipping;
    await store.dispatch(getShippings());
    state = store.getState().shipping;
    store.dispatch(clearShippingError());
    state = store.getState().shipping;
    expect(state.error).toBeNull();
  });
});