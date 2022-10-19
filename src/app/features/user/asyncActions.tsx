import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/api';
import { 
  IAuthData, 
  IPasswordToUpdate, 
  IUser, 
  IUserToUpdate 
} from './types';


export const signin = createAsyncThunk(
  'user/signin',
  async (userData: IAuthData, { rejectWithValue }) => {
    try {
      const { data } = await api.signin(userData);
      localStorage.setItem('profile', JSON.stringify(data));
      console.log('Signin action')
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const signup = createAsyncThunk(
  'user/signup',
  async (userData: IUser, { rejectWithValue }) => {
    try {
      const { data } = await api.signup(userData);
      localStorage.setItem('profile', JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userData: IUserToUpdate, { rejectWithValue }) => {
    try {
      const { data } = await api.updateUser(userData);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updatePassword = createAsyncThunk(
  'user/updatePassword',
  async (passwordData: IPasswordToUpdate, { rejectWithValue }) => {
    try {
      const { data } = await api.updatePassword(passwordData);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (id: string, { rejectWithValue }) => {
    try {
      await api.deleteUser(id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getUserReviews = createAsyncThunk(
  'user/getUserReviews',
  async (email: string, { rejectWithValue }) => {
    try {
      const { data } = await api.getUserReviews(email);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateReview = createAsyncThunk(
  'user/updateReview',
  async (reviewData: any, { rejectWithValue }) => {
    try {
      const { data } = await api.updateReview(reviewData);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteReview = createAsyncThunk(
  'user/deleteReview',
  async (id: string, { rejectWithValue }) => {
    try {
      await api.deleteReview(id);
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);