import { IOrder } from "../../../types/types";
import { IProduct } from "../product/types";


export interface IUserState {
  user: IUser | null;
  language: string;
  status: string;
  error: null | string;
}

export interface IUser {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  city: string;
  avatarUrl: string;
  wishList: IProduct[];
  orders: IOrder[];
  isAdmin: boolean;
}

export interface IUserToUpdate {
  id: string;
  userData: IUser;
};

export interface IAuthData {
  email: string;
  password: string;
};

export interface IPasswordToUpdate {
  id: string;
  currentPassword: string;
  newPassword: string;
};
