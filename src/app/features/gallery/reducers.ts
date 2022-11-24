import { createSlice } from '@reduxjs/toolkit';
import { getGalleryImages, addGalleryImage, deleteGalleryImage } from './asyncActions';
import { IGalleryState } from './types';

const initialState: IGalleryState = {
  status: 'idle',
  imageUrls: [],
  error: null
};

const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGalleryImages.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getGalleryImages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.imageUrls = action.payload;
      })
      .addCase(getGalleryImages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'error';
      })
      .addCase(addGalleryImage.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(addGalleryImage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.imageUrls.push(action.payload);
      })
      .addCase(addGalleryImage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'error';
      })
      .addCase(deleteGalleryImage.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(deleteGalleryImage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.imageUrls = state.imageUrls.filter(image => image._id !== action.meta.arg)
      })
  }
});

export default gallerySlice.reducer;