import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/api';


export const getShippings = createAsyncThunk(
  'shipping/getShipping',
  async (_: void, { rejectWithValue }) => {
    try {
      const { data } = await api.getShipping();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createShipping = createAsyncThunk(
  'shipping/createShipping',
  async (newShipping: any, { rejectWithValue }) => {
    try {
      const { data } = await api.createShipping(newShipping);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateShipping = createAsyncThunk(
  'shipping/updateShipping',
  async (shippingToUpdate: any, {rejectWithValue }) => {
    try {
      const { data } = await api.updateShipping(shippingToUpdate);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteShipping = createAsyncThunk(
  'shipping/deleteShipping',
  async (id: any, { rejectWithValue }) => {
    try {
      await api.deleteShipping(id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);