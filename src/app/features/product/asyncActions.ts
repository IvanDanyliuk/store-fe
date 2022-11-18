import { createAsyncThunk } from '@reduxjs/toolkit';
import { IProductData, IProductRequestData } from './types';
import * as api from '../../api/api';
import { IProductToUpdate } from './types';


export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (productRequestData: IProductRequestData, { rejectWithValue }) => {
    const { page, productsPerPage, category, filterData } = productRequestData;
    try {
      const { data } = await api.getProducts(page, productsPerPage, category!, filterData!);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getTopProducts = createAsyncThunk(
  'products/topProducts',
  async (_: void, { rejectWithValue }) => {
    try {
      const { data } = await api.getTopProducts();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getProduct = createAsyncThunk(
  'products/getProduct',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await api.getProduct(id);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const findProducts = createAsyncThunk(
  '/products/findProducts',
  async (title: string, { rejectWithValue }) => {
    try {
      const { data } = await api.findProducts(title);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getBrands = createAsyncThunk(
  'products/getBrands',
  async (category: any, { rejectWithValue }) => {
    try {
      const { data } = await api.getBrands(category);
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
      const { data } = await api.updateProduct(productToUpdate);
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