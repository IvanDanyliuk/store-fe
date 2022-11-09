import { RootStateType } from "../store";


export const selectVacancies = (state: RootStateType) => state.vacancies.vacancies.data;
export const selectVacancy = (state: RootStateType) => state.vacancies.vacancy;
export const selectPagesCount = (state: RootStateType) => state.vacancies.vacancies.pages;
export const selectVacancyStatus = (state: RootStateType) => state.vacancies.status;
export const selectVacancyError = (state: RootStateType) => state.vacancies.error;