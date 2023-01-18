import { ReactNode } from "react";
import { ICartItem } from "../app/features/cart/types";
import { IOrder } from "../app/features/order/types";
import { IProduct } from "../app/features/product/types";
import { IReview } from "../app/features/reviews/types";
import { IVacancy } from "../app/features/vacancies/types";


export interface ILayout {
  children: ReactNode;
}

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
  status: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export interface IProductsTableProps {
  products: IProduct[];
  status: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export interface IVacanciesTableProps {
  vacancies: IVacancy[];
  status: string;
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
  firstName: string,
  lastName: string,
  phone: string,
  email: string,
}

export interface IColor {
  color: string | undefined;
}

export interface IShoppingListProps {
  cart: ICartItem[] | [];
}

export interface ICheckbox {
  name: string;
  label?: string;
  checked: boolean;
  onChange: (e: any) => void;
}

export interface IInput {
  name: string;
  type?: string;
  label?: string;
  value?: string | number;
  minLength?: number;
  maxLength?: number;
  onChange: (e: any) => void;
  isRequired?: boolean;
}

export interface ITextArea {
  name: string;
  label?: string;
  value: string | number;
  rows?: number;
  minLength?: number;
  maxLength?: number;
  onChange: (e: any) => void;
  isRequired?: boolean;
}

export interface IAcceptPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface IEditReviewModalProps {
  review: IReview;
}

export interface IOrderFormProps {
  data: {
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | undefined;
    phone: string | undefined;
  };
  onChange: (e: any) => void;
}

export interface IOrderListProps {
  orders: IOrder[];
}

export interface IPaymentSystemIconProps {
  cardNumber: string;
}

export interface IPaginationBtn {
  isActive: boolean;
}

export interface IDivider {
  direction?: 'vertical' | 'horizontal';
  length: number | string;
  mTop?: number | string;
  mBottom?: number | string;
  mLeft?: number | string;
  mRight?: number | string;
}

export interface IFormErrorMessage {
  error: string;
}

export interface IPageListPaginationProps {
  pageCount: number;
  currentPage: number;
  setPage: (e: any) => void;
}

export interface IProductListImage {
  url: string;
  altText: string;
}

export interface ISearchResultsProps {
  isOpen: boolean;
  onClose: () => void;
  products: IProduct[];
}

export interface IDeleteItemModal {
  deleteHandler: () => void;
  message: string;
}