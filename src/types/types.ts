export interface IOrder {
  product: IProduct;
  date: string;
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  language: string;
  avatarUrl: string;
  orders: IOrder[];
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

export interface IProductListProps {
  category?: string;
}

export interface IProductCardProps {
  product: IProduct;
}

export interface ISubCategoriesProps {
  category?: string;
}