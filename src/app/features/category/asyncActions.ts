import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICategoryToUpdate, IProductCategory } from './types';
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
  async (newCategory: IProductCategory, { rejectWithValue }) => {
    try {
      if(!newCategory.main.title) {
        throw new Error();
      }
      const { data } = await api.createCategory(newCategory);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async (categoryToUpdate: ICategoryToUpdate, {rejectWithValue }) => {
    try {
      const { data } = await api.updateCategory(categoryToUpdate);
      return data;
    } catch (error) {
      return rejectWithValue({message: 'Category has to have a title. Fill the form!'});
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategories',
  async (id: string, { rejectWithValue }) => {
    try {
      await api.deleteCategory(id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);