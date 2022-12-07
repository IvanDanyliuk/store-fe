import { createSlice } from '@reduxjs/toolkit';
import { VACANCIES_PER_TABLE } from '../../services/constants';
import { getVacancies, getVacancy, createVacancy,updateVacancy, deleteVacancy } from './asyncActions';
import { IVacanciesState } from './types';


const initialState: IVacanciesState = {
  status: 'idle',
  vacancy: null,
  vacancies: {
    data: [],
    pages: 0,
  },
  error: null,
};

const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {
    setVacancyToUpdate: (state, action) => {
      state.vacancy = state.vacancies.data.find(item => item._id === action.payload);
    },
    clearVacancy: (state) => {
      state.vacancy = null;
    },
    clearVacancyError: (state) => {
      state.status = 'idle';
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
        state.error = 'alertGetVacanciesMessage';
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
        state.error = 'alertGetVacancyMessage';
      })
      .addCase(createVacancy.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(createVacancy.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.vacancies.data.length < VACANCIES_PER_TABLE && state.vacancies.data.push(action.payload);
      })
      .addCase(createVacancy.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'alertCreateVacancyMessage';
      })
      .addCase(updateVacancy.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(updateVacancy.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.vacancies.data = state.vacancies.data.map(vacancy => vacancy._id !== action.payload._id ? vacancy : { _id: vacancy._id, ...action.payload });
      })
      .addCase(updateVacancy.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'alertUpdateVacancyMessage';
      })
      .addCase(deleteVacancy.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(deleteVacancy.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.vacancies.data = state.vacancies.data.filter(vacancy => vacancy._id !== action.meta.arg);
      })
      .addCase(deleteVacancy.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'aletDeleteVacancyMessage';
      })
  }
});

export const { setVacancyToUpdate, clearVacancy, clearVacancyError } = vacanciesSlice.actions;

export default vacanciesSlice.reducer;