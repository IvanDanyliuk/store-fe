import { createAsyncThunk } from '@reduxjs/toolkit';
import { IOrder } from '../../../types/types';
import * as api from '../../api/api';


export const getOrders = createAsyncThunk(
  'orders/getOrders',
  async (_: void, { rejectWithValue }) => {
    try {
      const { data } = await api.getOrders();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getUserOrders = createAsyncThunk(
  'orders/getUserOrders',
  async (email: string, { rejectWithValue }) => {
    try {
      const { data } = await api.getUserOrder(email);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (order: IOrder, { rejectWithValue }) => {
    try {
      const { data } = await api.createOrder(order);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateOrder = createAsyncThunk(
  'orders/updateOrder',
  async (orderToUpdate: any, { rejectWithValue }) => {
    try {
      const { data } = await api.updateOrder(orderToUpdate);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const payOrder = createAsyncThunk(
  'orders/payOrder',
  async (paymentData: any, { rejectWithValue }) => {
    try {
      const { data } = await api.payOrder(paymentData);
      return data;
    } catch (error) {
      
    }
  })
)

export const deleteOrder = createAsyncThunk(
  'orders/deleteOrder',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await api.deleteOrder(id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
