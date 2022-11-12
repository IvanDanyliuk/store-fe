import { ReactNode } from "react";
import { IOrder } from "../app/features/order/types";
import { IProduct } from "../app/features/product/types";
import { IVacancy } from "../app/features/vacancies/types";


export interface IOrderInfo {
  product: IProduct;
  date: string;
}

export interface IComment {
  advantages: string;
  disadvantages: string;
  comment: string;
  rate: number;
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
  onClick?: (arg?: any) => void;
  color: ButtonColor;
  type: ButtonType;
  children: ReactNode | string;
}

export enum TableTypes {
  Products = 'products',
  Categories = 'categories',
  Shipping = 'options of shipping',
  Vacancies = 'vacancies',
}

export interface ITableProps {
  tableType: TableTypes;
  data: any;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export interface IProductsTableProps {
  products: IProduct[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export interface IVacanciesTableProps {
  vacancies: IVacancy[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export interface IOrdersTableProps {
  orders: IOrder[];
}

export interface IPaginationProps {
  range: any;
  slice: any;
  setPage: any;
  page: any;
}

export enum OperationType {
  Edit = 'edit',
  Delete = 'delete'
}

 export enum DataCategory {
  Category = 'category',
  Product = 'product',
  Order = 'order',
  User = 'user',
  Password = 'password',
  UserImage = 'user image',
}

export enum MessageModalType {
  PreModal = 'pre-modal',
  PostModal = 'post-modal',
}

export interface IOrderDetailsProps {
  order: IOrder;
}

export interface ICellProps {
  name: string;
}

export interface ICustomer {
  firstName: string | undefined,
  lastName: string | undefined,
  phone: string | undefined,
  email: string | undefined,
}

export interface IColor {
  color: string | undefined;
}