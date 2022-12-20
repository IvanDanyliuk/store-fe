import { productFromWishListMock } from '../../../../utils/testDataMocks';
import store from '../../store';
import { addToCart, clearCart, decreaseQuantity, increaseQuantity, removeFromCart } from '../reducers';


const cartItemMock = {
  _id: 'test_cart_item_id_1',
  quantity: 1, 
  product: productFromWishListMock
};

describe('Tests for the Cart reducers', () => {
  test('should add a cart item to the cart', () => {
    let state = store.getState().cart;
    store.dispatch(addToCart(cartItemMock));
    state = store.getState().cart;
    expect(state.cart[0]._id!).toBe(cartItemMock._id)
  });

  test('should remove a cart item from the cart', () => {
    let state = store.getState().cart;
    store.dispatch(addToCart(cartItemMock));
    state = store.getState().cart;
    store.dispatch(removeFromCart(cartItemMock._id));
    state = store.getState().cart;
    const element = store.getState().cart.cart.find(item => item._id === cartItemMock._id);
    expect(element).toBe(undefined);
  });

  test('should increase the product quantity', () => {
    let state = store.getState().cart;
    store.dispatch(addToCart(cartItemMock));
    state = store.getState().cart;
    store.dispatch(increaseQuantity(cartItemMock._id));
    state = store.getState().cart;
    expect(state.cart[0].quantity).toBe(cartItemMock.quantity + 1);
  });

  test('should decrease the product quantity', () => {
    let state = store.getState().cart;
    store.dispatch(addToCart(cartItemMock));
    state = store.getState().cart;
    store.dispatch(decreaseQuantity(cartItemMock._id));
    state = store.getState().cart;
    expect(state.cart[0].quantity).toBe(cartItemMock.quantity);
  });

  test('should clear a cart', () => {
    let state = store.getState().cart;
    store.dispatch(addToCart(cartItemMock));
    state = store.getState().cart;
    store.dispatch(clearCart());
    state = store.getState().cart;
    expect(state.cart.length).toBe(0)
  });
});