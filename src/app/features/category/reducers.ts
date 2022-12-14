import { createSlice } from '@reduxjs/toolkit';
import { getCategories, createCategory, updateCategory, deleteCategory } from './asyncActions';
import { ICategoryState } from './types';


const initialState: ICategoryState = {
  status: 'idle',
  category: null,
  categories: [],
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    getCategory: (state, action) => {
      state.category = state.categories.find(item => item._id === action.payload);
    },
    clearCategory: (state) => {
      state.category = null;
    },
    clearError: (state) => {
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'alertGetCategoriesMessage';
      })
      .addCase(createCategory.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'alertCreateCategoryMessage';
      })
      .addCase(updateCategory.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = state.categories.map(category => category._id !== action.payload._id ? category : { _id: category._id, ...action.payload });
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'alertUpdateCategoryMessage';
      })
      .addCase(deleteCategory.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = state.categories.filter(category => category._id !== action.meta.arg);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'alertDeleteCategoryMessage';
      })
  }
});

export const { getCategory, clearCategory, clearError } = categoriesSlice.actions;

export default categoriesSlice.reducer;