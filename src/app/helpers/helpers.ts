import { ICartItem } from "../features/cart/types";
import { IProductCategory } from "../features/category/types";
import { IProductData } from "../features/product/types";
import { IShipping } from "../features/shipping/types";
import { 
  PRIMARY_COLOR, 
  SECONDARY_COLOR, 
  SUCCESS_COLOR, 
  DANGER_COLOR, 
  DEFAULT_COLOR 
} from '../services/constants';


export const getFormattedTitle = (pathname: string, position: number) => {
  return pathname.split('/')[position];
};

export const setButtonColor = (color: string) => {
  switch (color) {
    case 'primary':
      return PRIMARY_COLOR;
    case 'secondary':
      return SECONDARY_COLOR;
    case 'success':
      return SUCCESS_COLOR;
    case 'danger':
      return DANGER_COLOR;
    default:
      return DEFAULT_COLOR;
  }
};

export const setCellWidth = (name: string, isMobile: boolean) => {
  switch(name) {
    case 'productName':
      return isMobile ? '250px' : '50%';
    case 'productPrice':
      return isMobile ? '100px' : '10%';
    case 'productRating':
      return isMobile ? '70px' : '10%';
    case 'productImage':
      return isMobile ? '100px' : '10%';
    case 'productActions':
      return isMobile ? '300px' : '20%';
    case 'categoryName':
      return isMobile ? '250px' : '80%';
    case 'categoryActions':
      return isMobile ? '230px' : '20%';
    case 'vacancyName':
      return isMobile ? '250px' : '80%';
    case 'vacancyActions':
      return isMobile ? '230px' : '20%';
    case 'shippingName':
      return isMobile ? '250px' : '80%';
    case 'shippingActions':
      return isMobile ? '230px' : '20%';
    case 'orderId':
      return isMobile ? '250px' : '30%';
    case 'orderDate':
      return isMobile ? '100px' : '15%';
    case 'orderAmount':
      return isMobile ? '70px' : '20%';
    case 'orderImage':
      return isMobile ? '100px' : '25%';
    case 'orderActions':
      return isMobile ? '50px' : '10%';
    default:
      return '0%';
  }
};

export const setOrderCellWidth = (name: string, isMobile: boolean) => {
  switch(name) {
    case 'image':
      return isMobile ? '70px' : '15%';
    case 'title':
      return isMobile ? '250px' : '45%';
    case 'quantity':
      return isMobile ? '70px' : '20%';
    case 'price':
      return isMobile ? '100px' : '20%';
    default:
      return '0%';
  }
};

export const setCategoryUrl = (title: string) => {
  const splittedTitle = title.toLowerCase().split(' ').map(item => item.replace(/[^a-z0-9]/gi, ''));
  return splittedTitle.length > 1 ? splittedTitle.join('-') : splittedTitle[0];
};

export const getSubCategoryList = (categories: IProductCategory[], mainCategoryTitle: string) => {
  return categories.find((category: IProductCategory) => category.main.title === mainCategoryTitle);
};

export const formatObjectKey = (key: string) => {
  const splittedKey = key.replace(/([a-z])([A-Z])/g, '$1 $2');
  return splittedKey[0].toUpperCase() + splittedKey.slice(1);
};

export const limitIncreasing = (num: number) => {
  if(num < 100) {
    return num + 1;
  }
  return num;
};

export const limitDecreasing = (num: number) => {
  if(num === 1) {
    return num;
  }
  return num - 1;
};

export const formatCardNumber = (cardNumber: string) => {
  const rawNumber = [...cardNumber.split(' ').join('')];
  const formattedCardNumber: any = [];
  rawNumber.forEach((char, i) => {
    if(i % 4 === 0) {
      formattedCardNumber.push(' ');
    }
    formattedCardNumber.push(char);
  });
  return formattedCardNumber.join('');
};

export const calculateOrderTotalAmount = (cart: ICartItem[]) => {
  return cart.reduce((acc: number, cur: ICartItem) => acc + (+cur.product.price * cur.quantity), 0);
}

export const getOtherProductsQuantity = (renderedProducts: number, productsQuantity: number) => {
  return productsQuantity > renderedProducts ? `+ ${productsQuantity - renderedProducts} more` : '';
};

export const checkNewProductData = (newProduct: IProductData) => {
  switch(true) {
    case typeof newProduct.price !== 'number':
      throw Error('Price should be a number!');
    case !newProduct.title:
    case !newProduct.price:
    case !newProduct.color:
    case !newProduct.shortInfo:
    case !newProduct.description:
      throw Error('Fill all the *required fields!');
    default:
      return;
  }
};

export const checkNewShippingData = (newShipping: IShipping) => {
  switch(true) {
    case !newShipping.company:
    case !newShipping.country:
      throw Error('Fill all the *required fields!');
    default:
      return;
  }
};