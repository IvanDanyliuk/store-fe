import { RootStateType } from '../store';

export const selectClientSecret = (state: RootStateType) => state.order.clientSecret;
export const selectPaymentStatus = (state: RootStateType) => state.order.paymentStatus;
export const selectOrderStatus = (state: RootStateType) => state.order.status;