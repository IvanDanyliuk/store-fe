import { IProduct } from "../product/types";


export interface ICartItem {
  _id: string,
  quantity: number, 
  product: IProduct
}
export interface ICart {
  status: string;
  cart: ICartItem[] | [];
  error: string | null;
};