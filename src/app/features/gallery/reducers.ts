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
  reducers: {
    clearGalleryError: (state) => {
      state.status = 'idle';
      state.error = null;
    }
  },
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
        state.error = 'alertGetGalleryImagesMessage';
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
        state.error = 'alertAddGalleryImageMessage';
      })
      .addCase(deleteGalleryImage.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(deleteGalleryImage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.imageUrls = state.imageUrls.filter(image => image._id !== action.meta.arg)
      })
      .addCase(deleteGalleryImage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'alertDeleteGalleryImageMessage';
      })
  }
});

export const { clearGalleryError } = gallerySlice.actions;

export default gallerySlice.reducer;