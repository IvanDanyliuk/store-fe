export interface IProductCategory {
  _id?: string;
  main: {
    title: string;
    url: string;
  };
  subCategories: {
    title: string;
    url: string;
    image: string;
  }[];
}

export interface ICategoryState {
  status: string;
  category: IProductCategory | null | undefined;
  categories: IProductCategory[];
  error: null | string;
}

export interface ICategoryToUpdate {
  id: string;
  updatedCategory: IProductCategory;
}