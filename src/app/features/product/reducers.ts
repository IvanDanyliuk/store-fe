import { createSlice } from '@reduxjs/toolkit';
import {  
  getProducts, 
  getTopProducts,
  getProduct, 
  getBrands, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  findProducts, 
} from './asyncActions';
import { IProductState } from './types';


const initialState: IProductState = {
  product: null,
  products: {
    data: [],
    pages: 0,
  },
  search: [],
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
      state.status = 'idle';
      state.error = null;
    },
    clearSearchData: (state) => {
      state.search = [];
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
        state.error = 'alertGetProductsMessage';
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
        state.error = 'alertGetTopProductsMessage';
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
        state.error = 'alertGetProductMessage';
      })
      .addCase(findProducts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(findProducts.fulfilled, (state, action) => {
        state.search = action.payload;
        state.status = 'succeeded';
      })
      .addCase(findProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'alertFindProductsMessage';
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
        state.error = 'alertGetBrandsMessage';
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
        state.error = 'alertCreateProductMessage';
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
        state.error = 'alertUpdateProductMessage';
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
        state.error = 'alertDeleteProductMessage';
      })
  },
});

export const { 
  setProductToUpdate, 
  clearProduct, 
  clearProductError, 
  clearSearchData 
} = productsSlice.actions;

export default productsSlice.reducer;