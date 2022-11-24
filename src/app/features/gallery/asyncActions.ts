import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/api';
import { IGalleryImage } from './types';


export const getGalleryImages = createAsyncThunk(
  'gallery/getGalleryImage',
  async (_: void, { rejectWithValue }) => {
    try {
      const { data } = await api.getGalleryImages();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addGalleryImage = createAsyncThunk(
  'gallery/addGalleryImage',
  async (imageUrl: IGalleryImage, { rejectWithValue }) => {
    try {
      const { data } = await api.addGalleryImage(imageUrl);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteGalleryImage = createAsyncThunk(
  'gallery/deleteGalleryImage',
  async (id: string, { rejectWithValue }) => {
    try {
      await api.deleteGalleryImage(id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);