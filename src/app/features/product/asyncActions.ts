import { createAsyncThunk } from '@reduxjs/toolkit';
import { IProductData } from '../../../types/types';
import * as api from '../../api/api';
import { IProductToUpdate } from './types';


export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (_: void, { rejectWithValue }) => {
    try {
      const { data } = await api.getProducts();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (newProduct: IProductData, { rejectWithValue }) => {
    try {
      const { data } = await api.createProduct(newProduct);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (productToUpdate: IProductToUpdate, { rejectWithValue }) => {
    try {
      const { data } = await api.updateProduct(productToUpdate.id, productToUpdate.updatedProduct);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id: string, { rejectWithValue }) => {
    try {
      await api.deleteProduct(id); 
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);