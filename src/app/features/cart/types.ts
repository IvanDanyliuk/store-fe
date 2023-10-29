import { IProduct } from "../product/types";


export interface ICartItem {
  id?: string;
  quantity: number; 
  product: IProduct;
}
export interface ICart {
  status: string;
  cart: ICartItem[] | [];
  error: string | null;
};