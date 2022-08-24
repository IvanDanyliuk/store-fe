import { ReactNode } from "react";
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

export interface IProductCategory {
  main: {
    title: string;
    url: string;
  };
  subCategory: {
    title: string;
    url: string;
  };
}

export interface IProduct {
  _id: string;
  category: IProductCategory;
  title: string;
  price: string;
  color: string;
  rating: number;
  image: string;
  promotion: string[];
  isInStock: boolean;
  shortInfo: string;
  description: string;
  reviews: IReview[];
}

export interface IProductData {
  category: IProductCategory;
  title: string;
  price: string;
  color: string;
  rating: number;
  image: string;
  promotion: string[];
  isInStock: boolean;
  shortInfo: string;
  description: string;
  reviews: IReview[];
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

export interface IButtonProps {
  onClick: () => void;
  color: ButtonColor;
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