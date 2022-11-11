import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/api';
import { IOrdersRequestData } from './types';


export const getOrders = createAsyncThunk(
  'orders/getOrders',
  async (ordersRequestData: IOrdersRequestData, { rejectWithValue }) => {
    const { page, ordersPerPage, filterData } = ordersRequestData;
    try {
      const { data } = await api.getOrders(page, ordersPerPage, filterData);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getUserOrders = createAsyncThunk(
  'orders/getUserOrders',
  async (ordersRequestData: IOrdersRequestData, { rejectWithValue }) => {
    const { page, ordersPerPage, email } = ordersRequestData;
    try {
      const { data } = await api.getUserOrder(page, ordersPerPage, email!);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (order: any, { rejectWithValue }) => {
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
  'orders/createPaymentIntent',
  async (order: any, { rejectWithValue }) => {
    try {
      const { data } = await api.payOrder(order);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

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
