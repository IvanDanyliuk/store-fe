import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/api';
import { IReview, IReviewToUpdate } from './types';


export const getUserReviews = createAsyncThunk(
  'reviews/getUserReviews',
  async (email: string, { rejectWithValue }) => {
    try {
      const { data } = await api.getUserReviews(email);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getProductReviews = createAsyncThunk(
  'reviews/getProductReviews',
  async (productId: string, { rejectWithValue }) => {
    try {
      const { data } = await api.getProductReviews(productId);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createReview = createAsyncThunk(
  'reviews/createReview',
  async (review: IReview, { rejectWithValue }) => {
    try {
      const { data } = await api.createReview(review);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateReview = createAsyncThunk(
  'reviews/updateReview',
  async (reviewData: IReviewToUpdate, { rejectWithValue }) => {
    try {
      const { data } = await api.updateReview(reviewData);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteReview = createAsyncThunk(
  'reviews/deleteReview',
  async (id: string, { rejectWithValue }) => {
    try {
      await api.deleteReview(id);
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);