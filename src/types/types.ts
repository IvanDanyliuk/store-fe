import { ReactNode } from "react";
import { IProduct } from "../app/features/product/types";
import { IUser } from "../app/features/user/types";

export interface IOrder {
  product: IProduct;
  date: string;
}

export interface IReview {
  user: IUser;
  comment: string;
  likes: number;
  dislikes: number;
  date: string;
}





export interface IProductListProps {
  products: IProduct[];
  category?: string;
}

export interface IProductCardProps {
  product: IProduct;
}

export interface ISubCategoriesProps {
  category?: string;
}

export enum ButtonColor {
  Primary = 'primary',
  Secondary = 'secondary',
  Success = 'success',
  Danger = 'danger',
}

export enum ButtonType {
  Submit = 'submit',
  Button = 'button',
  Reset = 'reset',
}

export interface IButtonProps {
  onClick: (arg?: any) => void;
  color: ButtonColor;
  type: ButtonType;
  children: ReactNode | string;
}

export enum TableTypes {
  Products = 'products',
  Categories = 'categories'
}

export interface ITableProps {
  tableType: TableTypes;
  data: any;
}

export interface IPaginationProps {
  range: any;
  slice: any;
  setPage: any;
  page: any;
}