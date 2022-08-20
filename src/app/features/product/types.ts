import { IProduct } from "../../../types/types";

export interface IProductState {
  status: string;
  products: IProduct[];
  error: null | string;
}

export interface IProductToUpdate {
  id: string;
  updatedProduct: IProduct;
}