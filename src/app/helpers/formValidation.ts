import { IProductCategory } from "../features/category/types";
import { IProductData } from "../features/product/types";
import { IShipping } from "../features/shipping/types";


type SetErrorType = (error: string) => void;

export const isShippingDataValid = (data: IShipping, setError: SetErrorType) => {
  if(!data.company) {
    setError('Company field is required!');
    return false;
  } else {
    setError('');
    return true;
  }
};

export const isProductDataValid = (data: IProductData, setError: SetErrorType) => {
  switch(true) {
    case !data.title:
      setError('Name field is required!');
      return false;
    case !data.price:
      setError('Price field is required!');
      return false;
    case !data.color:
      setError('Color field is required!');
      return false;
    case !data.shortInfo:
      setError('Short Information field is required!');
      return false;
    case !data.description:
      setError('Description field is required!');
      return false;
    default:
      setError('');
      return true;
  }
};

export const isCategoryDataValid = (data: IProductCategory, setError: SetErrorType) => {
  switch(true) {
    case !data.main.title:
      setError('Main Category Name field is required!');
      return false;
    case data.subCategories.length === 0:
      setError('Category should have at least one sub-category!');
      return false;
    default:
      setError('');
      return true;
  }
};
