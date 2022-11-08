import { createSlice } from '@reduxjs/toolkit';
import { getVacancies, getVacancy, createVacancy,updateVacancy, deleteVacancy } from './asyncActions';
import { IVacanciesState } from './types';


const initialState: IVacanciesState = {
  status: 'idle',
  vacancy: null,
  vacancies: [],
  error: null,
};

const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {
    clearVacancy: (state) => {
      state.vacancy = null;
    },
    clearVacancyError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVacancies.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getVacancies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.vacancies = action.payload;
      })
      .addCase(getVacancies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'error';
      })
      .addCase(getVacancy.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getVacancy.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.vacancy = action.payload;
      })
      .addCase(getVacancy.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'error';
      })
      .addCase(createVacancy.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(createVacancy.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.vacancies.push(action.payload);
      })
      .addCase(createVacancy.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'error';
      })
      .addCase(updateVacancy.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(updateVacancy.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.vacancies = state.vacancies.map(vacancy => vacancy._id !== action.payload._id ? vacancy : { _id: vacancy._id, ...action.payload });
      })
      .addCase(updateVacancy.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'error';
      })
      .addCase(deleteVacancy.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(deleteVacancy.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.vacancies = state.vacancies.filter(vacancy => vacancy._id !== action.meta.arg);
      })
      .addCase(deleteVacancy.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'error';
      })
  }
});

export const { clearVacancy, clearVacancyError } = vacanciesSlice.actions;

export default vacanciesSlice.reducer;