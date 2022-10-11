import { IProductData } from "../features/product/types";
import { IShipping } from "../features/shipping/types";


export const isShippingDataValid = (data: IShipping, setError: (error: string) => void) => {
  if(!data.company) {
    setError('Company field is required!');
    return false;
  } else {
    setError('');
    return true;
  }
};

export const isProductDataValid = (data: IProductData, setError: (error: string) => void) => {
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