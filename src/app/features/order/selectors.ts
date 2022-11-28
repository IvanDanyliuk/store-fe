import { RootStateType } from '../store';

export const selectClientSecret = (state: RootStateType) => state.order.clientSecret;
export const selectOrder = (state: RootStateType) => state.order.order;
export const selectOrderStatus = (state: RootStateType) => state.order.status;
export const selectOrderError = (state: RootStateType) => state.order.error;
export const selectOrders = (state: RootStateType) => state.order.orders.data;
export const selectOrderPages = (state: RootStateType) => state.order.orders.pages;