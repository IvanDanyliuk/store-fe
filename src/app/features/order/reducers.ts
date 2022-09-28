import { createSlice } from '@reduxjs/toolkit';
import { getOrders, getUserOrders, createOrder, updateOrder, deleteOrder } from './asyncActions';
import { IOrderState } from './types';


const initialState: IOrderState = {
  status: 'idle',
  orders: [],
  error: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
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
        state.orders = state.orders.filter(order => order._id !== action.payload);
      })
      .addCase(deleteOrder.rejected, (state, action) =>{
        state.status = 'failed';
        state.error = 'error';
      })
  }
});

// export const {  } = ordersSlice.actions;

export default ordersSlice.reducer;