import { ICartItem } from "../cart/types";
import { IProduct } from "../product/types";
import { IUser } from "../user/types";


export interface IOrderState {
  status: string;
  order: IOrder | null;
  clientSecret: any;
  orders: IOrder[];
  error: null | string;
}

export interface IOrder {
  _id: string;
  products: ICartItem[];
  amount: number;
  customer: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
  recepient: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
  isPaid: boolean;
  isShipped: boolean;
  shippingCity: string;
  shippingCompany: string;
  paymentMethod: string;
  creditCardNumber: string;
  createdAt: string;
}

export interface IOrderToUpdate {
  id: string;
  updatedOrder: IOrder;
}