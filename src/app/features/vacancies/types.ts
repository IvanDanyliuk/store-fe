export interface IVacanciesState {
  status: string;
  vacancy: null | IVacancy | undefined,
  vacancies: {
    data: IVacancy[];
    pages: number;
  };
  error: null | string;
}

export interface IVacancy {
  _id?: string;
  title: string,
  employment: string;
  character: string;
  responsibilities: string;
  mustHaves: string;
  experience: string;
  salary?: string;
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
  createdAt?: string;
}

export interface IVacancyToUpdate {
  id: string;
  updatedVacancy: IVacancy;
}

export interface IVacanciesRequestData {
  page: number;
  itemsPerPage: number;
}