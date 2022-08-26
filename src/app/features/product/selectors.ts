import { RootStateType } from "../store";

export const selectProducts = (state: RootStateType) => state.product.products;
export const selectProduct = (state: RootStateType) => state.product.product;
export const selectProductStatus = (state: RootStateType) => state.product.status;
