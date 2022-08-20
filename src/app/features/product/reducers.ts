import { createSlice } from '@reduxjs/toolkit';
import { getProducts, createProduct, updateProduct, deleteProduct } from './asyncActions';
import { IProductState } from './types';


const initialState: IProductState = {
  products: [],
  status: 'idle',
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'error';
      })
      .addCase(createProduct.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'error';
      })
      .addCase(updateProduct.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = state.products.map(product => product._id === action.meta.arg.id ? { ...action.meta.arg.updatedProduct } : product);
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'error';
      })
  },
});

// export const {  } = productsSlice.actions;

export default productsSlice.reducer;