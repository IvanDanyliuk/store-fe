import { IUser } from './../features/user/types';
import { IAuthData } from './../features/user/types';
import { IProductCategory } from "../features/category/types";
import { IProductData } from "../features/product/types";
import { IShipping } from "../features/shipping/types";
import { IComment } from '../../types/types';


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

export const checkEmailFormat = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const checkPasswordFormat = (password: string) => {
  return password.length === 6;
};

export const isSigninDataValid = (data: IAuthData, setError: SetErrorType) => {
  const isEmailFormatValid = checkEmailFormat(data.email);
  const isPasswordFormatValid = checkPasswordFormat(data.password);

  switch(true) {
    case !data.email:
      setError('Email field is required!');
      return false;
    case !data.password:
      setError('Password field is required!');
      return false;
    case !isEmailFormatValid:
      setError('Invalid email!');
      return false;
    case !isPasswordFormatValid:
      setError('Your password has to be 6 characters in length!');
      return false;
    default:
      setError('');
      return true;
  }
};

export const isSignupDataValid = (data: IUser, setError: SetErrorType) => {
  const isEmailFormatValid = checkEmailFormat(data.email);
  const isPasswordFormatValid = checkPasswordFormat(data.password);

  switch(true) {
    case !data.firstName:
      setError('First Name is required!');
      return false;
    case !data.lastName:
      setError('Last Name is required!');
      return false;
    case !data.email:
      setError('Email is required!');
      return false;
    case !data.password:
      setError('Password is required!');
      return false;
    case !data.city:
      setError('City field is required!');
      return false;
    case !data.phone:
      setError('Phone field is required!');
      return false;
    case !isEmailFormatValid:
      setError('Invalid email!');
      return false;
    case !isPasswordFormatValid:
      setError('Your password has to be 6 characters in length!');
      return false;
    default:
      setError('');
      return true;
  }
};

export const isCommentDataValid = (data: IComment, setError: SetErrorType) => {
  if(!data.comment) {
    setError('Comment field is required');
    return false;
  } else {
    setError('');
    return true;
  }
};