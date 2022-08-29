import { IReview } from "../../../types/types";

export interface IProduct {
  _id: string;
  category: {
    main: {
      title: string;
      url: string;
    };
    subCategory: {
      title: string;
      url: string;
    };
  };
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
  category: {
    main: {
      title: string;
      url: string;
    };
    subCategory: {
      title: string;
      url: string;
    };
  };
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

export interface IProductState {
  status: string;
  product: IProduct | null,
  products: IProduct[];
  error: null | string;
}

export interface IProductToUpdate {
  id: string;
  updatedProduct: IProduct;
}