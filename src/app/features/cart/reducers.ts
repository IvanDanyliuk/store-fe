import { createSlice } from '@reduxjs/toolkit';
import { limitDecreasing, limitIncreasing } from '../../helpers/helpers';
import { ICart, ICartItem } from './types';


const cart = JSON.parse(localStorage.getItem('cart')!);

const initialState: ICart = {
  status: 'idle',
  cart: cart ? cart : [],
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.status = 'succeeded';
      state.cart = [...state.cart, action.payload];
    },
    removeFromCart: (state, action) => {
      state.status = 'succeeded';
      state.cart = state.cart.filter((item: ICartItem) => item._id !== action.payload)
    },
    increaseQuantity: (state, action) => {
      state.status = 'succeeded';
      state.cart = state.cart.map((item: ICartItem) => item._id === action.payload ? { ...item, quantity: limitIncreasing(item.quantity) } : item);
    }, 
    decreaseQuantity: (state, action) => {
      state.status = 'succeeded';
      state.cart = state.cart.map((item: ICartItem) => item._id === action.payload ? { ...item, quantity: limitDecreasing(item.quantity) } : item);
    },
    clearCart: (state) => {
      state.status = 'succeeded';
      state.cart = [];
    },
  }
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;