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
  price: number;
  color: string;
  rating: number;
  image: string;
  promotion: string[] | any;
  isInStock: boolean;
  shortInfo: string;
  description: string;
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
  price: number;
  color: string;
  rating: number;
  image: string;
  promotion: string[] | any;
  isInStock: boolean;
  shortInfo: string;
  description: string;
}

export interface IProductState {
  status: string;
  product: IProduct | null | undefined,
  products: IProduct[];
  error: null | string;
}

export interface IProductToUpdate {
  id: string;
  updatedProduct: IProduct;
}