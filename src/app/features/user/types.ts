import { IOrder } from "../../../types/types";

export interface IUserState {
  user: IUser;
  status: string;
  error: null | string;
}

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  city: string;
  language: string;
  avatarUrl: string;
  orders: IOrder[];
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
  curPassword: string;
  newPassword: string;
};

export interface ILanguageToUpdate {
  id: string | undefined;
  language: string | undefined;
};
