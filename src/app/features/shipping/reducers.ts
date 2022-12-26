import { createSlice } from '@reduxjs/toolkit';
import { getShippings, createShipping, updateShipping, deleteShipping } from './asyncActions';
import { IShippingState } from './types';


const initialState: IShippingState = {
  status: 'idle',
  shipping: null,
  shippings: [],
  error: null,
};

const shippingSlice = createSlice({
  name: 'shippings',
  initialState,
  reducers: {
    getShipping: (state, action) => {
      state.shipping = state.shippings.find(item => item._id === action.payload);
    },
    clearShipping: (state) => {
      state.shipping = null;
    },
    clearShippingError: (state) => {
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getShippings.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getShippings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.shippings = action.payload;
      })
      .addCase(getShippings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'alertGetShippingsMessage';
      })
      .addCase(createShipping.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(createShipping.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.shippings.push(action.payload);
      })
      .addCase(createShipping.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'alertCreateShippingMessage';
      })
      .addCase(updateShipping.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(updateShipping.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.shippings = state.shippings.map(shipping => shipping._id !== action.payload._id ? shipping : { _id: shipping._id, ...action.payload });
      })
      .addCase(updateShipping.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'alertUpdateShippingMessage';
      })
      .addCase(deleteShipping.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(deleteShipping.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.shippings = state.shippings.filter(shipping => shipping._id !== action.meta.arg);
      })
      .addCase(deleteShipping.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'alertDeleteShippingMessage';
      })
  }
});

export const { getShipping, clearShipping, clearShippingError } = shippingSlice.actions;

export default shippingSlice.reducer;