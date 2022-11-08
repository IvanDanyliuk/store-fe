import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/api';


export const getVacancies = createAsyncThunk(
  'vacancies/getVacancies',
  async (_: void, { rejectWithValue }) => {
    try {
      const { data } = await api.getVacancies();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getVacancy = createAsyncThunk(
  'vacancies/getVacancy',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await api.getVacancy(id);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createVacancy = createAsyncThunk(
  'vacancies/createVacancy',
  async (newVacancy: any, { rejectWithValue }) => {
    try {
      const { data } = await api.createVacancy(newVacancy);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateVacancy = createAsyncThunk(
  'vacancies/updateVacancy',
  async (vacancyToUpdate: any, {rejectWithValue }) => {
    try {
      const { data } = await api.updateVacancy(vacancyToUpdate);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteVacancy = createAsyncThunk(
  'vacancies/deleteVacancy',
  async (id: any, { rejectWithValue }) => {
    try {
      await api.deleteVacancy(id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);