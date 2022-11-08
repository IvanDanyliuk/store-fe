export interface IVacanciesState {
  status: string;
  vacancy: null | IVacancy,
  vacancies: IVacancy[];
  error: null | string;
}

export interface IVacancy {
  _id?: string;
  title: string,
  employment: string[];
  character: string[];
  responsibilities: string;
  mustHaves: string;
  experience: string;
  salary?: string;
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
}

export interface IVacancyToUpdate {
  id: string;
  updatedVacancy: IVacancy;
}