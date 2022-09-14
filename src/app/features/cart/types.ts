import { IProduct } from "../product/types";

export interface ICart {
  status: string;
  cart: IProduct[];
  error: string | null;
};