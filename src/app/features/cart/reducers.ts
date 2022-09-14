import { createSlice } from '@reduxjs/toolkit';
import { IProduct } from '../product/types';
import { ICart } from './types';


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
      state.cart = cart.filter((product: IProduct) =>product._id !== action.payload)
    },
    clearCart: (state) => {
      state.status = 'succeeded';
      state.cart = [];
    },
  }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;