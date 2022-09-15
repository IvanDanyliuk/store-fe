import { RootStateType } from './../store';


export const selectCartData = (state: RootStateType) => state.cart.cart;