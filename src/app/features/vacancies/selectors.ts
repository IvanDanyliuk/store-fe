import { RootStateType } from "../store";


export const selectVacancies = (state: RootStateType) => state.vacancies.vacancies;
export const selectVacancy = (state: RootStateType) => state.vacancies.vacancy;
export const selectVacancyStatus = (state: RootStateType) => state.vacancies.status;
export const selectVacancyError = (state: RootStateType) => state.vacancies.error;