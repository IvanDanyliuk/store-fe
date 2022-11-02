import { createSlice } from '@reduxjs/toolkit';
import {  
  getProducts, 
  getTopProducts,
  getProduct, 
  getBrands, 
  createProduct, 
  updateProduct, 
  deleteProduct, 
} from './asyncActions';
import { IProductState } from './types';


const initialState: IProductState = {
  product: null,
  products: {
    data: [],
    pages: 0,
  },
  brands: [],
  status: 'idle',
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductToUpdate: (state, action) => {
      state.product = state.products.data.find(item => item._id === action.payload);
    },
    clearProduct: (state) => {
      state.product = null;
    },
    clearProductError: (state) => {
      state.error = null;
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
      .addCase(getTopProducts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getTopProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(getTopProducts.rejected, (state, action) => {
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
      .addCase(getBrands.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.brands = action.payload;
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'error';
      })
      .addCase(createProduct.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products.data.push(action.payload);
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
        state.product = action.payload
        state.products.data = state.products.data.map(product => product._id === action.meta.arg.id ? { ...action.meta.arg.updatedProduct } : product);
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
        state.products.data = state.products.data.filter(product => product._id !== action.meta.arg);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'error';
      })
  },
});

export const { setProductToUpdate, clearProduct, clearProductError } = productsSlice.actions;

export default productsSlice.reducer;