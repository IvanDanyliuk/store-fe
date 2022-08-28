import { createSlice } from '@reduxjs/toolkit';
import { getCategories, createCategory, updateCategory, deleteCategory } from './asyncActions';
import { ICategoryState } from './types';


const initialState: ICategoryState = {
  status: 'idle',
  categories: [],
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {

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
        state.error = 'error';
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
        state.error = 'error';
      })
      .addCase(updateCategory.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = state.categories.map(category => category);
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'error';
      })
      // .addCase(deleteCategory.pending, (state, action) => {
      //   state.status = 'loading';
      // })
      // .addCase(deleteCategory.fulfilled, (state, action) => {
      //   state.status = 'succeeded';

      // })
  }
});

// export const {  } = categoriesSlice.actions;

export default categoriesSlice.reducer;