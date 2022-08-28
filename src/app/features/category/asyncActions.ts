import { createAsyncThunk } from '@reduxjs/toolkit';
import { IProductCategory } from './types';
import * as api from '../../api/api';

export const getCategories = createAsyncThunk(
  'categories/getCategories',
  async (_: void, { rejectWithValue }) => {
    try {
      const { data } = await api.getCategories();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (newCategory: any, { rejectWithValue }) => {
    try {
      const { data } = await api.createCategory(newCategory);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async (categoryToUpdate: any, {rejectWithValue }) => {
    try {
      const { data } = await api.updateCategory(categoryToUpdate);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategories',
  async (id: any, { rejectWithValue }) => {
    try {
      await api.deleteCategory(id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);