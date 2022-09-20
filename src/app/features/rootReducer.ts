import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/reducers';
import productReducer from './product/reducers';
import categoryReducer from './category/reducers';
import shippingReducer from './shipping/reducers';
import cartReducer from './cart/reducers';


const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  category: categoryReducer,
  shipping: shippingReducer,
  cart: cartReducer,
});

export default rootReducer;