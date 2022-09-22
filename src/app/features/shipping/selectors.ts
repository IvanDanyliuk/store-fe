import { RootStateType } from "../store";


export const selectShippings = (state: RootStateType) => state.shipping.shippings;
export const selectShipping = (state: RootStateType) => state.shipping.shipping;
export const selectShippingStatus = (state: RootStateType) => state.shipping.status;