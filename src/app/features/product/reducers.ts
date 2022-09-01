import { createSlice } from '@reduxjs/toolkit';
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from './asyncActions';
import { IProductState } from './types';


const initialState: IProductState = {
  product: null,
  products: [],
  status: 'idle',
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductToUpdate: (state, action) => {
      state.product = state.products.find(item => item._id === action.payload);
    },
    clearProduct: (state) => {
      state.product = null;
    }
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
      .addCase(getProduct.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
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
      .addCase(deleteProduct.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = state.products.filter(product => product._id !== action.meta.arg);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'error';
      })
  },
});

export const { setProductToUpdate, clearProduct } = productsSlice.actions;

export default productsSlice.reducer;