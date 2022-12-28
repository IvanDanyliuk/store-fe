import { IUser } from './../features/user/types';
import { IAuthData } from './../features/user/types';
import { IProductCategory } from "../features/category/types";
import { IProductData } from "../features/product/types";
import { IShipping } from "../features/shipping/types";
import { IComment } from '../../types/types';
import { IVacancy } from '../features/vacancies/types';


type SetErrorType = (error: string) => void;

export const isShippingDataValid = (data: IShipping, setError: SetErrorType) => {
  if(!data.company) {
    setError('shippingValidationCompanyRequired');
    return false;
  } else {
    setError('');
    return true;
  }
};

export const isProductDataValid = (data: IProductData, setError: SetErrorType) => {
  switch(true) {
    case !data.title:
      setError('productValidationNameRequired');
      return false;
    case !data.price:
      setError('productValidationPriceRequired');
      return false;
    case !data.color:
      setError('productValidationColorRequired');
      return false;
    case !data.shortInfo:
      setError('productValidationShortInfoRequired');
      return false;
    case !data.description:
      setError('productValidationDescriptionRequired');
      return false;
    default:
      setError('');
      return true;
  }
};

export const isCategoryDataValid = (data: IProductCategory, setError: SetErrorType) => {
  switch(true) {
    case !data.main.title:
      setError('categoryValidationMainCategoryRequired');
      return false;
    case data.subCategories.length === 0:
      setError('categoryValidationSubCategoryRequired');
      return false;
    default:
      setError('');
      return true;
  }
};

export const isVacancyDataValid = (data: IVacancy, setError: SetErrorType) => {
  switch(true) {
    case !data.title:
      setError('vacanciesValidationTitleRequired');
      return false;
    case !data.responsibilities:
      setError('vacanciesValidationResponsibilitiesRequired');
      return false;
    case !data.contactPerson:
      setError('vacanciesValidationContactPersonRequired');
      return false;
    case !data.contactPhone:
      setError('vacanciesValidationContactPhoneRequired');
      return false;
    case !data.contactEmail:
      setError('vacanciesValidationContactEmailRequired');
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
      setError('authValidationEmailRequired');
      return false;
    case !data.password:
      setError('authValidationPasswordRequired');
      return false;
    case !isEmailFormatValid:
      setError('authValidationIcorrectEmail');
      return false;
    case !isPasswordFormatValid:
      setError('authValidationIncorrectPassword');
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
    setError('commentValidationCommentRequired');
    return false;
  } else {
    setError('');
    return true;
  }
};