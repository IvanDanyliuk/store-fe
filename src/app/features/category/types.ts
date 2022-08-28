export interface IProductCategory {
  main: {
    title: string;
    url: string;
  };
  subCategory: {
    title: string;
    url: string;
  };
}

export interface ICategoryState {
  status: string;
  categories: IProductCategory[];
  error: null | string;
}

export interface ICategoryToUpdate {
  id: string;
  updatedCategory: IProductCategory;
}