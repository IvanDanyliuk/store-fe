import { IProduct } from "../product/types";
import { IUser } from "../user/types";


export interface IOrderState {
  status: string;
  paymentStatus: string;
  clientSecret: any;
  orders: IOrder[];
  error: null | string;
}

export interface IOrder {
  _id:string;
  products: IProduct[];
  user: IUser;
  isPaid: boolean;
  isShipped: boolean;
  paymentMethod: string;
  createdAt: {
    type: Date;
    default: Date;
  };
}

export interface IOrderToUpdate {
  id: string;
  updatedOrder: IOrder;
}