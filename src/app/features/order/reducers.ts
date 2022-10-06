import { createSlice } from '@reduxjs/toolkit';
import { limitDecreasing, limitIncreasing } from '../../helpers/helpers';
import { ICartItem } from '../cart/types';
import { getOrders, getUserOrders, createOrder, updateOrder, payOrder, deleteOrder } from './asyncActions';
import { IOrderState } from './types';


const initialState: IOrderState = {
  status: 'idle',
  order: null,
  clientSecret: null,
  orders: [],
  error: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearClientSecret: (state) => {
      state.clientSecret = null;
    }, 
    setOrderToUpdate: (state, action) => {
      state.order = action.payload;
    },
    clearOrderToUpdate: (state) => {
      state.order = null;
    },
    removeProductFromOrder: (state, action) => {
      state.order = { ...state.order!, products: state.order!.products.filter(item => item._id !== action.payload) };
    },
    increaseOrderProductQuantity: (state, action) => {
      state.order = { ...state.order!, products: state.order!.products.map((item: ICartItem) => item._id === action.payload ? { ...item, quantity: limitIncreasing(item.quantity) } : item) };
    }, 
    decreaseOrderProductQuantity: (state, action) => {
      state.order = { ...state.order!, products: state.order!.products.map((item: ICartItem) => item._id === action.payload ? { ...item, quantity: limitDecreasing(item.quantity) } : item)};
    },
    clearOrder: (state) => {
      state.status = 'idle';
      state.orders = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) =>{
        state.status = 'failed';
        state.error = 'error';
      })
      .addCase(getUserOrders.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'error';
      })
      .addCase(createOrder.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) =>{
        state.status = 'failed';
        state.error = 'error';
      })
      .addCase(updateOrder.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = state.orders.map(order => order._id !== action.payload._id ? order : { _id: order._id, ...action.payload });
        state.order = null;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'error';
      })
      .addCase(deleteOrder.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = state.orders.filter(order => order._id !== action.meta.arg);
      })
      .addCase(deleteOrder.rejected, (state, action) =>{
        state.status = 'failed';
        state.error = 'error';
      })
  }
});

export const { 
  clearOrder, 
  setOrderToUpdate, 
  clearOrderToUpdate, 
  increaseOrderProductQuantity, 
  decreaseOrderProductQuantity, 
  removeProductFromOrder 
} = ordersSlice.actions;

export default ordersSlice.reducer;