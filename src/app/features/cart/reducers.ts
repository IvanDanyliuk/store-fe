import { createSlice } from '@reduxjs/toolkit';
import { IProduct } from '../product/types';
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
      state.cart = state.cart.filter((item: ICartItem) => item.id !== action.payload)
    },
    increaseQuantity: (state, action) => {
      state.status = 'succeeded';
      state.cart = state.cart.map((item: ICartItem) => item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item);
    }, 
    decreaseQuantity: (state, action) => {
      state.status = 'succeeded';
      state.cart = state.cart.map((item: ICartItem) => item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item);
    },
    clearCart: (state) => {
      state.status = 'succeeded';
      state.cart = [];
    },
  }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;