import { ICartItem } from "../cart/types";


export interface IOrderState {
  status: string;
  order: IOrder | null;
  clientSecret: any;
  orders: {
    data: IOrder[];
    pages: number;
  };
  error: null | string;
}

export interface IOrder {
  _id?: string;
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
  createdAt?: string;
}

export interface IOrderToUpdate {
  id: string;
  updatedOrder: IOrder;
}

export interface IOrdersRequestData {
  page: number;
  ordersPerPage: number;
  email?: string;
  filterData?: string;
}